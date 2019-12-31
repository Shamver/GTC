const express = require('express');

const router = express.Router();
const db = require('../db_con')();

const conn = db.init();

router.get('/post', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT ID AS postId, TITLE AS postTitle, date_format(DATE, '%Y-%m-%d %H:%i:%s') AS postDate, VIEWS AS postViews
    FROM GTC_BOARD_POST
    WHERE WRITER='${userId}'
    `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(rows);
    } else {
      res.send(rows);
    }
  });
});

router.get('/reply', (req, res) => {
  const { userId } = req.query;

  // 댓글 콘텐츠의 내부 형식을 알아낸 후 3줄만 보낼지 처리 필요할듯 (장문이나 그런거 좀 더러워질듯)
  const query = `SELECT GBP.ID AS postId, GBP.TITLE AS postTitle, GBR.ID AS replyId, GBR.CONTENT AS replyContent, GBR.DATE
		FROM GTC_BOARD_POST GBP LEFT JOIN GTC_BOARD_REPLY GBR
  	ON GBP.ID = GBR.BP_ID
  	WHERE GBR.WRITER = ${userId}
	`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(rows);
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
