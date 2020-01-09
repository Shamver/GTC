const express = require('express');

const router = express.Router();
const db = require('../../db_con')();

const conn = db.init();

router.get('/favorite', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT GUFP.ID AS favoriteId, GBP.TITLE AS postTitle, GUFP.POST_ID AS postId, date_format(GUFP.DATE, '%Y-%m-%d %H:%i:%s') AS date FROM GTC_USER_FAVORITE_POST GUFP LEFT JOIN GTC_BOARD_POST GBP
    ON GUFP.POST_ID = GBP.ID
    WHERE GUFP.USER_ID='${userId}'
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

router.delete('/favorite', (req, res) => {
  const data = req.body;

  const query = `DELETE FROM GTC_USER_FAVORITE_POST
    WHERE ID='${data.name}'
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});

module.exports = router;
