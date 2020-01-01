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

// 줄 길어지는거나 도배한거 어떻게 하냐.. 처리해야함.
router.get('/reply', (req, res) => {
  const { userId } = req.query;

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

// const query = `DELETE FROM GTC_USER_FAVORITE_POST
//     WHERE ID IN (${data.list.join()})
//   `; 복수 선택
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
