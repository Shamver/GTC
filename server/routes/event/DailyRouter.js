const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_ATTENDANCE = `
  SELECT 
    U.NICKNAME AS nickname
    , D.MESSAGE AS message
    , D.POINT AS point
    , D.COMBO AS combo
    , date_format(D.CRT_DTTM, '%H:%i') AS time
  FROM 
    GTC_USER U
    , GTC_ATTENDANCE D
  WHERE 
    U.ID = D.USER_ID
    AND (DATE_FORMAT(CRT_DTTM, '%Y%m%d000000') > DATE_FORMAT(SUBDATE(SYSDATE(), 1), '%Y%m%d000000'))
  ORDER BY D.CRT_DTTM ASC
  LIMIT 30
`;

const SELECT_ATTENDANCE_LAST = `
  SELECT 
    COMBO AS combo
    , DATE_FORMAT(CRT_DTTM, '%Y%m%d') AS date
    , CASE WHEN DATE_FORMAT(CRT_DTTM, '%Y%m%d') = DATE_FORMAT(SYSDATE(), '%Y%m%d') THEN 'Y'
      ELSE 'N'
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

const INSERT_EVENT_DAILY = `
  INSERT INTO GTC_ATTENDANCE (
    ID
    , USER_ID
    , MESSAGE
    , POINT
    , COMBO
    , CRT_DTTM
  ) VALUES (
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1, 1) FROM GTC_ATTENDANCE) as temp)
    , :USER_ID
    , ':MESSAGE'
    , (CASE
       WHEN (SELECT * FROM (SELECT IFNULL(COMBO, 0) + 1 FROM GTC_ATTENDANCE WHERE (DATE_FORMAT(SYSDATE(),'%Y%m%d000000') > DATE_FORMAT(CRT_DTTM,'%Y%m%d000000')) AND (DATE_FORMAT(DATE,'%Y%m%d000000') = date_format(SUBDATE(sysdate(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS C) % 7 = 0 THEN 40
       WHEN (SELECT * FROM (SELECT IFNULL(COMBO, 0) + 1 FROM GTC_ATTENDANCE WHERE (DATE_FORMAT(SYSDATE(),'%Y%m%d000000') > DATE_FORMAT(CRT_DTTM,'%Y%m%d000000')) AND (DATE_FORMAT(DATE,'%Y%m%d000000') = date_format(SUBDATE(sysdate(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS C) % 30 = 0 THEN 120
       ELSE 20 END
      ) + (
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
       )
    , SYSDATE()
    , (SELECT CASE WHEN (SELECT * FROM (SELECT IFNULL(MAX(COMBO), 0) + 1 FROM GTC_ATTENDANCE WHERE (DATE_FORMAT(SYSDATE(),'%Y%m%d000000') > DATE_FORMAT(CRT_DTTM,'%Y%m%d000000')) AND (DATE_FORMAT(DATE,'%Y%m%d000000') = DATE_FORMAT(SUBDATE(SYSDATE(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS C) > 0 THEN
      (SELECT * FROM (SELECT IFNULL(MAX(COMBO), 0) + 1 FROM GTC_ATTENDANCE WHERE (DATE_FORMAT(SYSDATE(),'%Y%m%d000000') > DATE_FORMAT(CRT_DTTM,'%Y%m%d000000')) AND (DATE_FORMAT(DATE,'%Y%m%d000000') = DATE_FORMAT(SUBDATE(SYSDATE(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS C)
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
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '출석체크 목록 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/event/daily] 출석체크 목록 조회');
  });
});

router.get('/last', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_ATTENDANCE_LAST,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '출석체크 마지막 한 날 조회',
          DATA: rows,
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
          res.json({
            SUCCESS: true,
            CODE: 2,
            MESSAGE: '오늘은 이미 출석체크를 했습니다.',
          });
          throw new Error('이미 출석체크 되었습니다.');
        } else {
          return database.query(
            INSERT_EVENT_DAILY,
            {
              USER_ID: userId,
              MESSAGE: message,
            },
          );
        }
      })
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '출석체크가 완료되었습니다!',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/event/daily] 출석체크 성공');
  });
});

module.exports = router;
