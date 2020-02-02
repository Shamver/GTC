const express = require('express');

const router = express.Router();
const db = require('../../dbConnection')();
const { info } = require('../../log-config');

const conn = db.init();

router.post('/', (req, res) => {
  const data = req.body;
  let query = `SELECT COUNT(*) AS count FROM GTC_BOARD_REPORT
    WHERE TARGET_ID = ${data.targetId}
    AND U_ID = ${data.writerId}
    AND TYPE = '${data.type}'
    `;

  info(query);

  conn.query(query, (err, rows) => {
    if (err) throw err;

    // 이미 해당 타겟에 동일한 유저가 신고를 함.
    if (rows[0].count === 1) {
      res.send(2);
    } else {
      query = `INSERT INTO GTC_BOARD_REPORT
        VALUES (
          (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_BOARD_REPORT) as temp),
          ${data.targetId},
          ${data.writerId},
          '${data.type}',
          '${data.reason}'
        )`;

      info(query);

      conn.query(query, (err2) => {
        if (err2) throw err2;
        res.send(1);
      });
    }
  });
});

module.exports = router;
