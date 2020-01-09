const express = require('express');

const router = express.Router();
const db = require('../../db_con')();

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

// 줄 길어지는거나 도배한거 어떻게 하냐.. 처리해야함.
router.get('/reply', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT GBP.ID AS postId, GBP.TITLE AS postTitle, GBR.ID AS replyId, GBR.CONTENT AS replyContent, date_format(GBR.DATE, '%Y-%m-%d %H:%i:%s') AS replyDate
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
