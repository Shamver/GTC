const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');

const Database = require('../../Database');

const SELECT_CURRENT_BOARD = `
  SELECT LOWER(B_ID) AS currentBoard 
  FROM GTC_BOARD_POST
  WHERE ID = :ID
`;

router.get('/', (req, res) => {
  const { data } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_CURRENT_BOARD,
      {
        ID: data.id,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '현재 게시판 로딩',
          DATA: rows[0].currentBoard,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/board] 현재 게시판 조회');
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
