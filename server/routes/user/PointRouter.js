const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_USER_POINT_LIST = `
  SELECT 
    @ROWNUM := @ROWNUM + 1 AS rn
    , (SELECT Ceil(COUNT(*)/:MAX_COUNT) FROM GTC_USER_POINT WHERE USER_ID = :USER_ID) AS pageCount
    , ID AS id
    , TARGET_ID AS postId
    , TYPE_CD AS type
    , COST AS point
    , DATE_FORMAT(CRT_DTTM, '%Y-%m-%d %H:%i:%s') AS date
  FROM 
    GTC_USER_POINT
    , (SELECT @ROWNUM := :ROWNUM) AS TEMP
  WHERE USER_ID = :USER_ID
  ORDER BY CRT_DTTM DESC
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
    info('[SELECT, GET /api/user/point] 포인트 목록 조회');
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
    info('[SELECT, GET /api/user/point/sum] 포인트 합계 조회');
  });
});

module.exports = router;
