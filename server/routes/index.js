const express = require('express');

const router = express.Router();

const db = require('../db_con')();

const conn = db.init();

router.get('/test', (req, res) => {
  conn.query('SELECT * FROM test', (err, rows) => {
    if (err) throw err;

    res.send(rows);
  }).then(() => console.log('ㅎㅇ'));
});

module.exports = router;
