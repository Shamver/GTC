const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_USER_POINT_LIST = `
  SELECT 
  @rownum:=@rownum+1 as rn
  , (SELECT Ceil(COUNT(*)/:MAX_COUNT) FROM GTC_USER_POINT WHERE USER_ID = :USER_ID) AS pageCount
  , ID AS id
  , TYPE AS type
  , POST_ID AS postId
  , REPLY_ID AS replyId
  , COST AS point
  , date_format(DATE, '%Y-%m-%d %H:%i:%s') AS date
  FROM GTC_USER_POINT, (SELECT @ROWNUM := :ROWNUM) AS TEMP
  WHERE USER_ID = :USER_ID
  ORDER BY DATE DESC
  LIMIT :ROWNUM, :MAX_COUNT
`;

const SELECT_USER_POINT_SUM = `
  SELECT SUM(COST) AS point
  FROM GTC_USER_POINT
  WHERE USER_ID = :USER_ID;
`;

router.get('/', (req, res) => {
  const { userId } = req.query;
  let { currentPage } = req.query;
  currentPage = currentPage || 1;

  const MaxCount = 30;

  Database.execute(
    (database) => database.query(
      SELECT_USER_POINT_LIST,
      {
        USER_ID: userId,
        MAX_COUNT: MaxCount,
        ROWNUM: (currentPage - 1) * MaxCount,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '포인트 목록 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/user/point] 포인트 목록 조회');
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

router.get('/sum', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_USER_POINT_SUM,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        let { point } = rows[0];
        point = point || 0;
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '포인트 합계 조회',
          DATA: point,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/user/point/sum] 포인트 합계 조회');
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
