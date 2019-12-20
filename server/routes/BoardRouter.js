const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/auth');

const db = require('../db_con')();

const conn = db.init();

router.get('/post', (req, res) => {
  const data = req.query;
  const query = `SELECT * FROM GTC_BOARD_POST 
    WHERE B_ID = '${data.board.replace('/', '')}'`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});


router.use('/post', authMiddleware);
router.post('/post', (req, res) => {
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
     ${data.depth},
     '${data.secret}',
     '${data.secretReplyAllow}',
     '${data.replyAllow}'
    )`;

  conn.query(query, (err) => {
    if (err) throw err;
    res.send(true);
  });
});
module.exports = router;
