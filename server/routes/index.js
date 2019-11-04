const express = require('express');

const router = express.Router();

const db = require('../db_con')();

const conn = db.init();
db.test_open(conn);

router.get('/', (req, res) => res.json({ data: 'this is index.' }));

router.get('/test', (req, res) => {
  conn.query('SELECT * FROM test', (err, rows) => {
    if (err) throw err;

    res.send(rows);
  }).then(() => console.log('ㅎㅇ'));
});

module.exports = router;
