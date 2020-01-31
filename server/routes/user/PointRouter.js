const express = require('express');

const router = express.Router();

const db = require('../../dbConnection')();

const conn = db.init();

router.get('/sum', (req, res) => {
  const { userId } = req.body;

  const query = `
    SELECT SUM(COST) AS point
    FROM GTC_USER_POINT
    WHERE USER_ID = ${userId};
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});

module.exports = router;
