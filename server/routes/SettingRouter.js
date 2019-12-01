const express = require('express');

const router = express.Router();
const db = require('../db_con')();

const conn = db.init();

router.post('/getignore', (req, res) => {
  const data = req.body;
  const query = `SELECT ID AS id, FROM_ID AS f_id, TARGET_ID AS t_id, DATE AS date FROM GTC_USER_IGNORE
    WHERE FROM_ID='${data.user_id}'`;

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
