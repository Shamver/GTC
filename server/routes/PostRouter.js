const express = require('express');

const router = express.Router();

const db = require('../db_con')();

const conn = db.init();

router.post('/addPost', (req, res) => {
  const data = req.body;
  const query = `INSERT INTO GTC_BOARD_POST
    (BP_ID, B_ID, BC_ID, BP_ID_REPLY, BP_TITLE, BP_WRITER, BP_DATE, BP_VIEWS, BP_CONTENT, BP_DEPTH)
    VALUES(
    (SELECT * FROM (SELECT IFNULL(MAX(BP_ID)+1,1) FROM GTC_BOARD_POST) as temp),
    '${data.board}',
    '${data.category}',
    null,
    '${data.title}',
    1,
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
