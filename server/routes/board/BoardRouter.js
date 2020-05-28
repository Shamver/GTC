const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');

const Database = require('../../Database');

const SELECT_CURRENT_BOARD = `
  SELECT LOWER(BOARD_CD) AS currentBoard 
  FROM GTC_POST
  WHERE ID = :POST_ID
`;

router.get('/', (req, res) => {
  const { id } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_CURRENT_BOARD,
      {
        POST_ID: id,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 0,
          MESSAGE: '현재 게시판 조회 성공',
          DATA: rows[0].currentBoard,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board] 현재 게시판 조회');
  });
});
module.exports = router;
