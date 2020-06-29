const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_POST_ADVERTISE_LIST = `
  SELECT
      ID AS id
      , (SELECT NAME FROM GTC_USER WHERE ID = AD.USER_ID) AS name
      , MESSAGE AS message
      , URL AS url
  FROM GTC_POST_ADVERTISE AD
`;

const SELECT_POST_ADVERTISE_LIST_AFTER_NOW = `
  SELECT
      ID AS id
      , (SELECT NAME FROM GTC_USER WHERE ID = AD.USER_ID) AS name
      , MESSAGE AS message
      , URL AS url
  FROM GTC_POST_ADVERTISE AD
  WHERE DATE_ADD(CRT_DTTM, INTERVAL HOURS HOUR) > now()
`;

const INSERT_POST_ADVERTISE = `
  INSERT INTO GTC_POST_ADVERTISE (
    USER_ID
    , URL
    , MESSAGE
    , HOURS
    , CRT_DTTM
  ) VALUES (
     :USER_ID
     , ':URL'
     , ':MESSAGE'
     , :HOURS
     , SYSDATE()
  )
`;

const SELECT_URL_VALIDATION = `
  SELECT ID AS postId
  FROM GTC_POST
  WHERE ID = :URL;
`;

const INSERT_POINT = `
  INSERT INTO GTC_USER_POINT (
    USER_ID
    , TARGET_ID
    , TYPE_CD
    , COST
    , CRT_DTTM
  ) VALUES (
    :USER_ID
    , :TARGET_ID
    , ':TYPE_CD'
    , :COST
    , SYSDATE()
  )
`;

router.post('/', (req, res) => {
  const {
    userId, message, url, hours, postId,
  } = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_URL_VALIDATION,
      {
        URL: postId,
      },
    )
      .then((rows) => {
        if (!rows[0].postId) {
          return Promise.reject();
        }
        return database.query(
          INSERT_POST_ADVERTISE,
          {
            USER_ID: userId,
            MESSAGE: message,
            URL: url,
            HOURS: hours,
          },
        );
      })
      .then(() => (
        database.query(
          INSERT_POINT,
          {
            TYPE_CD: 'ADVERTISE',
            TARGET_ID: null,
            COST: hours * 100,
            USER_ID: userId,
          },
        )
      ))
      .then(() => {
        res.json({
          success: true,
          code: 0,
          message: '😊 포스팅이 성공적으로 광고 목록에 삽입되었습니다.',
        });
      })
      .catch(() => {
        res.json({
          success: false,
          code: 1,
          message: '😳 존재하지 않는 게시물 입니다.',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/event/advertise] 광고 신청');
  });
});

router.get('/', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_POST_ADVERTISE_LIST,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 0,
          message: '광고 목록 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/event/advertise] 광고중인 목록 조회');
  });
});

// 이 라우팅을 애드블락이 막음
router.get('/now', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_POST_ADVERTISE_LIST_AFTER_NOW,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 0,
          message: '현재 광고중인 목록 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/event/advertise/now] 현재 광고중인 목록 조회');
  });
});

module.exports = router;
