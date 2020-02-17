const express = require('express');

const router = express.Router();
const db = require('../../dbConnection')();

const conn = db.init();

// 우선은 어차피 포스트만 즐겨찾기 대상이기 때문에 루트로만 라우팅. 추가적으로 생기면 진행.
router.get('/', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT GBP.TITLE AS postTitle
    , GUF.POST_ID AS postId
    , date_format(GBP.DATE, '%Y-%m-%d %H:%i:%s') AS postDate
    , GUF.DATE AS favoriteDate
    , GBP.VIEWS AS postViews
    FROM GTC_USER_FAVORITE GUF LEFT JOIN GTC_BOARD_POST GBP
    ON GUF.POST_ID = GBP.ID
    WHERE GUF.USER_ID=${userId}
    ORDER BY favoriteDate DESC
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

router.post('/', (req, res) => {
  const data = req.body;

  const query = `INSERT INTO GTC_USER_FAVORITE
    VALUES(
      ${data.userId}
      , ${parseInt(data.bpId, 10)}
      , sysdate()
      )
  `;

  conn.query(query, (err) => {
    if (err) {
      if (err.errno === 1062) {
        res.send({
          POST_SUCCESS: false,
          MESSAGE: '😓 이미 즐겨찾기 등록된 게시물입니다ㅠ',
        });
      } else {
        throw err;
      }
    } else {
      res.send(200);
    }
  });
});

router.delete('/', (req, res) => {
  const data = req.body;

  const query = `DELETE FROM GTC_USER_FAVORITE
    WHERE POST_ID=${data.bpId} AND USER_ID=${data.userId}
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
