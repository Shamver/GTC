const express = require('express');

const router = express.Router();
const db = require('../../db_con')();

const conn = db.init();

// 우선은 어차피 포스트만 즐겨찾기 대상이기 때문에 루트로만 라우팅. 추가적으로 생기면 진행.
router.get('/', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT GUF.ID AS favoriteId, GBP.TITLE AS postTitle, GUF.POST_ID AS postId, date_format(GUF.DATE, '%Y-%m-%d %H:%i:%s') AS date
    FROM GTC_USER_FAVORITE GUF LEFT JOIN GTC_BOARD_POST GBP
    ON GUF.POST_ID = GBP.ID
    WHERE GUF.USER_ID='${userId}'
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

router.delete('/', (req, res) => {
  const data = req.body;

  const query = `DELETE FROM GTC_USER_FAVORITE
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
