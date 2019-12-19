const express = require('express');

const router = express.Router();

const db = require('../db_con')();

const conn = db.init();

router.post('/addPost', (req, res) => {
  const data = req.body;
  const query = `INSERT INTO GTC_BOARD_POST
    VALUES(
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_BOARD_POST) as temp),
    '${data.board}',
    '${data.category}',
    null,
    '${data.title}',
    '${data.writer}',
    sysdate(),
    0,
    '${data.content}',
     ${data.depth}
    )`;

  conn.query(query, (err) => {
    if (err) throw err;
    res.send(true);
  });
});

router.post('/getPost', (req, res) => {
  const data = req.body;
  const query = `SELECT * FROM GTC_BOARD_POST 
    WHERE B_ID = '${data.board.replace('/', '')}'`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

module.exports = router;
