const express = require('express');

const router = express.Router();

const db = require('../../dbConnection')();

const conn = db.init();

router.get('/', (req, res) => {
  const { userId } = req.query;

  const query = `
    SELECT ID AS id
    , TYPE AS type
    , POST_ID AS postId
    , REPLY_ID AS replyId
    , COST AS point
    , date_format(DATE, '%Y-%m-%d %H:%i:%s') AS date
    FROM GTC_USER_POINT
    WHERE USER_ID = ${userId};
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.send(404);
    }
  });
});

router.get('/sum', (req, res) => {
  const { userId } = req.query;

  const query = `
    SELECT SUM(COST) AS point
    FROM GTC_USER_POINT
    WHERE USER_ID = ${userId};
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.send(rows[0].point);
    } else {
      res.send(404);
    }
  });
});

module.exports = router;
