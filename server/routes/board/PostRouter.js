const express = require('express');

const router = express.Router();
const db = require('../../db_con')();

const conn = db.init();

router.get('/mine', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT ID AS postId, TITLE AS postTitle, date_format(DATE, '%Y-%m-%d %H:%i:%s') AS postDate, VIEWS AS postViews
    FROM GTC_BOARD_POST
    WHERE WRITER='${userId}'
    `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(rows.reverse());
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
