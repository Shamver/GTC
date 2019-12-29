const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/auth');

const db = require('../db_con')();

const conn = db.init();

router.get('/post', (req, res) => {
  const data = req.query;
  const query = `SELECT P.ID AS id
        , P.TITLE AS title
        , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.WRITER) AS writer
        , P.DEPTH AS depth
        , if(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(P.DATE, '%Y%m%d'),DATE_FORMAT(P.DATE, '%H:%i'),DATE_FORMAT(P.DATE, '%m-%d')) AS date
    FROM GTC_BOARD_POST P 
    WHERE B_ID = '${data.board.replace('/', '')}'
    ORDER BY P.DATE DESC`;

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

router.get('/post/:id', (req, res) => {
  const query = `SELECT P.ID AS id
        , B_ID AS board
        , if(B_ID = 'FREE','자유게시판','그외') as boardName
        , BC_ID AS category
        , if(BC_ID = 'FREE','자유','그외') as categoryName
        , P.TITLE AS title
        , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = 1) AS writer
        , P.DEPTH AS depth
        , if(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(P.DATE, '%Y%m%d'),DATE_FORMAT(P.DATE, '%H:%i'),DATE_FORMAT(P.DATE, '%m-%d')) AS date
        , P.SECRET as secret
        , P.CONTENT AS content
        , P.SECRET_REPLY_ALLOW as secretReplyAllow
        , P.REPLY_ALLOW as replyAllow
    FROM GTC_BOARD_POST P 
    WHERE ID = ${req.params.id}`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});
module.exports = router;
