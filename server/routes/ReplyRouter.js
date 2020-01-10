const express = require('express');

const router = express.Router();

const db = require('../db_con')();

const conn = db.init();

router.delete('/reply', (req, res) => {
  const data = req.query;
  const query = `DELETE FROM GTC_BOARD_REPLY
        WHERE ID = ${data.id}`;

  conn.query(query, (err) => {
    if (err) throw err;
    res.send(true);
  });
});

module.exports = router;
