const express = require('express');

const router = express.Router();

const db = require('../../dbConnection')();

const conn = db.init();

const { get, del } = require('../../middleware/latelyCookie');

router.get('/', (req, res) => {
  const { lately } = req.cookies;

  if (lately !== '' && lately !== undefined) {
    const data = get(lately);

    const query = `SELECT
  ID AS postId
  , TITLE AS postTitle
  FROM GTC_BOARD_POST
  WHERE ID IN (${data})
  ORDER BY FIELD (id, ${data})
  `;

    conn.query(query, (err, rows) => {
      if (err) throw err;

      res.send(rows);
    });
  } else {
    res.send(200);
  }
});

router.delete('/', (req, res) => {
  const { lately } = req.cookies;
  const { id } = req.body;

  const resetCookie = del(lately, id.toString());

  res.cookie('lately', resetCookie, { httpOnly: true });
  res.send({
    MESSAGE: '😊 성공적으로 삭제되었습니다!',
  });
});

module.exports = router;
