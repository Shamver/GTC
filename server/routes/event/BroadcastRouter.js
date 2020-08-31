const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const point = require('../../middleware/point');

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
     , sysdate()
  )
`;

const SELECT_URL_VALIDATION = `
  SELECT ID AS postId
  FROM GTC_POST
  WHERE ID = :URL;
`;

router.post('/', (req, res) => {
  const {
    userId, message, url, hours, postId,
  } = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_URL_VALIDATION,
      {
        URL: postId || null,
      },
    )
      .then((rows) => {
        if (rows.length === 0 && postId !== undefined) {
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
      .then(() => {
        point('custom', 'ADVERTISE', {
          writer: userId,
          cost: hours * -100,
        });
      })
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😊 포스팅이 성공적으로 광고 목록에 삽입되었습니다.',
        });
      })
      .catch(() => {
        res.json({
          success: false,
          code: 2,
          message: '😳 존재하지 않는 게시물 입니다.',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/event/broadcast] 광고 신청');
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
    info('[SELECT, GET /api/event/broadcast] 광고중인 목록 조회');
  });
});

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
    info('[SELECT, GET /api/event/broadcast/now] 현재 광고중인 목록 조회');
  });
});

module.exports = router;
