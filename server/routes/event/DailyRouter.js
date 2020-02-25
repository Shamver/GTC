const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_EVENT_DAILY_LIST = `
  SELECT 
  U.NICKNAME AS nickname
  , D.MESSAGE AS message
  , D.POINT AS point
  , D.COMBO AS combo
  , date_format(D.DATE, '%H:%i') AS time
  FROM GTC_USER U, GTC_EVENT_DAILY D
  WHERE U.ID = D.USER_ID
  AND (DATE_FORMAT(DATE,'%Y%m%d000000') > date_format(SUBDATE(sysdate(), 1), '%Y%m%d000000'))
  ORDER BY D.DATE DESC
  LIMIT 30
`;

const SELECT_EVENT_DAILY_LAST = `
  SELECT 
  COMBO AS combo
  , date_format(DATE, '%Y%m%d') AS date
  FROM GTC_EVENT_DAILY
  WHERE USER_ID = :USER_ID
  ORDER BY DATE DESC
  LIMIT 1
`;

const SELECT_EVENT_DAILY_TODAY = `
  SELECT *
  FROM GTC_EVENT_DAILY
  WHERE USER_ID = :USER_ID
  AND (DATE_FORMAT(DATE,'%Y%m%d000000') > date_format(SUBDATE(sysdate(), 1), '%Y%m%d000000'))
`;

const INSERT_EVENT_DAILY = `
  INSERT INTO GTC_EVENT_DAILY VALUES(
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_EVENT_DAILY) as temp)
    , :USER_ID
    , ':MESSAGE'
    , (CASE
           WHEN (SELECT *
                 FROM (SELECT IFNULL(MAX(COMBO) + 1, 1)
                       FROM GTC_EVENT_DAILY
                       WHERE (DATE_FORMAT(DATE, '%Y%m%d000000') >
                             date_format(SUBDATE(sysdate(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS a) = 6 THEN 40
           WHEN (SELECT *
                 FROM (SELECT IFNULL(MAX(COMBO) + 1, 1)
                       FROM GTC_EVENT_DAILY
                       WHERE (DATE_FORMAT(DATE, '%Y%m%d000000') >
                             date_format(SUBDATE(sysdate(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS a) = 29 THEN 120
           ELSE 20 END
        ) +
      (
            CASE
                 WHEN (SELECT * FROM (SELECT COUNT(*)
                       FROM GTC_EVENT_DAILY
                       WHERE date_format(DATE, '%Y%m%d%H%i%S') >= date_format(sysdate(), '%Y%m%d000000')) AS a) = 0 THEN 50
                 WHEN (SELECT * FROM (SELECT COUNT(*)
                       FROM GTC_EVENT_DAILY
                       WHERE date_format(DATE, '%Y%m%d%H%i%S') >= date_format(sysdate(), '%Y%m%d000000')) AS a) = 1 THEN 30
                 WHEN (SELECT * FROM (SELECT COUNT(*)
                       FROM GTC_EVENT_DAILY
                       WHERE date_format(DATE, '%Y%m%d%H%i%S') >= date_format(sysdate(), '%Y%m%d000000')) AS a) = 2 THEN 10
                 ELSE 0 END)
    , sysdate()
    , (SELECT * FROM (SELECT IFNULL(MAX(COMBO) + 1, 1) FROM GTC_EVENT_DAILY WHERE (DATE_FORMAT(DATE,'%Y%m%d000000') > date_format(SUBDATE(sysdate(), 1), '%Y%m%d000000')) AND USER_ID = :USER_ID) AS C)
  )
`;

router.get('/', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_EVENT_DAILY_LIST,
    )
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/event/daily] 출석체크 목록 조회');
  }).catch((err) => {
    // 트랜잭션 중 에러가 났을때 처리.
    error(err.message);

    // Database 에서 보여주는 에러 메시지
    if (err.sqlMessage) {
      error(err.sqlMessage);
    }

    // 실행된 sql
    if (err.sql) {
      error(err.sql);
    }
  });
});

router.get('/last', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_EVENT_DAILY_LAST,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/event/daily/last] 출석체크 마지막 한 날 조회');
  }).catch((err) => {
    // 트랜잭션 중 에러가 났을때 처리.
    error(err.message);

    // Database 에서 보여주는 에러 메시지
    if (err.sqlMessage) {
      error(err.sqlMessage);
    }

    // 실행된 sql
    if (err.sql) {
      error(err.sql);
    }
  });
});

router.post('/', (req, res) => {
  const { userId, message } = req.body.params;

  Database.execute(
    (database) => database.query(
      SELECT_EVENT_DAILY_TODAY,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        if (rows.length >= 1) {
          res.send({
            SUCCESS: false,
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
        res.send({
          SUCCESS: true,
          MESSAGE: '출석체크가 완료되었습니다!',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/event/daily] 출석체크 성공');
  }).catch((err) => {
    // 트랜잭션 중 에러가 났을때 처리.
    error(err.message);

    // Database 에서 보여주는 에러 메시지
    if (err.sqlMessage) {
      error(err.sqlMessage);
    }

    // 실행된 sql
    if (err.sql) {
      error(err.sql);
    }
  });
});

module.exports = router;
