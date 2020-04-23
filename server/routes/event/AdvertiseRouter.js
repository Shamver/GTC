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

const INSERT_POST_ADVERTISE = `
  INSERT INTO GTC_POST_ADVERTISE (
    ID
    , USER_ID
    , URL
    , MESSAGE
    , HOURS
    , CRT_DTTM
  ) VALUES (
     (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_POST_ADVERTISE) as temp)
     , :USER_ID
     , ':URL'
     , ':MESSAGE'
     , :HOURS
     , SYSDATE()
  )
`;

router.post('/', (req, res) => {
  const {
    userId, message, url, hours,
  } = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_POST_ADVERTISE,
      {
        USER_ID: userId,
        MESSAGE: message,
        URL: url,
        HOURS: hours,
      },
    )
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 0,
          MESSAGE: '😊 포스팅이 성공적으로 광고 목록에 삽입되었습니다.',
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
          SUCCESS: true,
          CODE: 0,
          MESSAGE: '출석체크 목록 조회',
          rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/event/advertise] 현재 광고중인 목록 조회');
  });
});

module.exports = router;
