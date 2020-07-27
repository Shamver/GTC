const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const point = require('../../middleware/point');

const SELECT_ATTENDANCE = `
  SELECT 
    D.ID AS id
    , U.NICKNAME AS nickname
    , D.MESSAGE AS message
    , D.POINT AS point
    , D.COMBO AS combo
    , DATE_FORMAT(D.CRT_DTTM, '%H:%i') AS time
  FROM 
    GTC_USER U
    , GTC_ATTENDANCE D
  WHERE 
    U.ID = D.USER_ID
    AND (DATE_FORMAT(D.CRT_DTTM, '%Y%m%d000000') > DATE_FORMAT(SUBDATE(SYSDATE(), 1), '%Y%m%d000000'))
  ORDER BY D.CRT_DTTM ASC
  LIMIT 30
`;

const SELECT_ATTENDANCE_LAST = `
  SELECT 
    COMBO AS combo
    , DATE_FORMAT(CRT_DTTM, '%Y%m%d') AS date
    , CASE WHEN DATE_FORMAT(CRT_DTTM, '%Y%m%d') = DATE_FORMAT(SYSDATE(), '%Y%m%d') THEN 1
      ELSE 0
      END AS isDoneToday
  FROM GTC_ATTENDANCE
  WHERE USER_ID = :USER_ID
  ORDER BY CRT_DTTM DESC
  LIMIT 1
`;

const SELECT_ATTENDANCE_TODAY = `
  SELECT 
    *
  FROM GTC_ATTENDANCE
  WHERE 
    USER_ID = :USER_ID
    AND (DATE_FORMAT(CRT_DTTM,'%Y%m%d000000') > DATE_FORMAT(SUBDATE(SYSDATE(), 1), '%Y%m%d000000'))
`;

const SELECT_EVENT_DAILY_COST = `
  SELECT
    (
        CASE
         WHEN (SELECT * FROM (SELECT COUNT(*)
               FROM GTC_ATTENDANCE
               WHERE DATE_FORMAT(CRT_DTTM, '%Y%m%d%H%i%S') >= DATE_FORMAT(SYSDATE(), '%Y%m%d000000')) AS a) = 0 THEN 50
         WHEN (SELECT * FROM (SELECT COUNT(*)
               FROM GTC_ATTENDANCE
               WHERE DATE_FORMAT(CRT_DTTM, '%Y%m%d%H%i%S') >= DATE_FORMAT(SYSDATE(), '%Y%m%d000000')) AS a) = 1 THEN 30
         WHEN (SELECT * FROM (SELECT COUNT(*)
               FROM GTC_ATTENDANCE
               WHERE date_format(CRT_DTTM, '%Y%m%d%H%i%S') >= DATE_FORMAT(SYSDATE(), '%Y%m%d000000')) AS a) = 2 THEN 10
         ELSE 0 END
      ) AS rank
    , (CASE
       WHEN (SELECT * FROM (SELECT IFNULL(COMBO, 0) + 1 FROM GTC_ATTENDANCE WHERE (DATE_FORMAT(SYSDATE(),'%Y%m%d000000') > DATE_FORMAT(CRT_DTTM,'%Y%m%d000000')) AND (DATE_FORMAT(CRT_DTTM,'%Y%m%d000000') = DATE_FORMAT(SUBDATE(SYSDATE(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS C) % 7 = 0 THEN 40
       WHEN (SELECT * FROM (SELECT IFNULL(COMBO, 0) + 1 FROM GTC_ATTENDANCE WHERE (DATE_FORMAT(SYSDATE(),'%Y%m%d000000') > DATE_FORMAT(CRT_DTTM,'%Y%m%d000000')) AND (DATE_FORMAT(CRT_DTTM,'%Y%m%d000000') = DATE_FORMAT(SUBDATE(SYSDATE(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS C) % 30 = 0 THEN 120
       ELSE 20 END
      ) AS combo
    FROM GTC_ATTENDANCE
    LIMIT 0, 1
`;

const INSERT_EVENT_DAILY = `
  INSERT INTO GTC_ATTENDANCE (
    USER_ID
    , MESSAGE
    , POINT
    , COMBO
  ) VALUES (
    :USER_ID
    , ':MESSAGE'
    , :COST
    , (SELECT CASE WHEN (SELECT * FROM (SELECT IFNULL(MAX(COMBO), 0) + 1 FROM GTC_ATTENDANCE WHERE (DATE_FORMAT(SYSDATE(),'%Y%m%d000000') > DATE_FORMAT(CRT_DTTM,'%Y%m%d000000')) AND (DATE_FORMAT(CRT_DTTM,'%Y%m%d000000') = DATE_FORMAT(SUBDATE(SYSDATE(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS C) > 0 THEN
      (SELECT * FROM (SELECT IFNULL(MAX(COMBO), 0) + 1 FROM GTC_ATTENDANCE WHERE (DATE_FORMAT(SYSDATE(),'%Y%m%d000000') > DATE_FORMAT(CRT_DTTM,'%Y%m%d000000')) AND (DATE_FORMAT(CRT_DTTM,'%Y%m%d000000') = DATE_FORMAT(SUBDATE(SYSDATE(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS C)
      ELSE 1
      END)
  )
`;

router.get('/', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_ATTENDANCE,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '출석체크 목록 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/event/daily] 출석체크 목록 조회');
  });
});

router.get('/last', (req, res) => {
  const { userDataId } = req.query;

  Database.execute(
    (database) => database.query(
      userDataId ? SELECT_ATTENDANCE_LAST : '',
      {
        USER_ID: userDataId,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '출석체크 마지막 한 날 조회',
          result: rows,
        });
      }, () => {
        res.json({
          success: true,
          code: 2,
          message: '로그인 후 이용해 주세요.',
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/event/daily/last] 출석체크 마지막 한 날 조회');
  });
});

router.post('/', (req, res) => {
  const { userId, message } = req.body.params;

  Database.execute(
    (database) => database.query(
      SELECT_ATTENDANCE_TODAY,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        if (rows.length >= 1) {
          return Promise.reject();
        }

        return database.query(
          SELECT_EVENT_DAILY_COST,
          {
            USER_ID: userId,
          },
        );
      })
      .then((rows) => {
        const { rank, combo } = rows[0];
        const cost = rank + combo;
        point('custom', 'DAILY', {
          writer: userId,
          cost,
        });
        return database.query(
          INSERT_EVENT_DAILY,
          {
            USER_ID: userId,
            MESSAGE: message,
            COST: cost,
          },
        );
      })
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '출석체크가 완료되었습니다!',
        });
      }, () => {
        res.json({
          success: true,
          code: 2,
          message: '😓 오늘은 이미 출석체크를 했습니다.',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/event/daily] 출석체크 성공');
  });
});

module.exports = router;
