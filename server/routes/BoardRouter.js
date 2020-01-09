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
  let query = `SELECT P.ID AS id
        , B_ID AS board
        , if(B_ID = 'FREE','자유게시판','그외') as boardName
        , BC_ID AS category
        , if(BC_ID = 'FREE','자유','그외') as categoryName
        , P.TITLE AS title
        , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.WRITER) AS writer
        , P.DEPTH AS depth
        , CASE WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇초 전'
                    WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE,DATE, SYSDATE()),'분 전')
                    WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR,DATE, SYSDATE()),'시간 전')
                    WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY,DATE, SYSDATE()),'일 전')
                    WHEN DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH,DATE, SYSDATE()),'달 전')
                   ELSE CONCAT(TIMESTAMPDIFF(YEAR,DATE, SYSDATE()),'년 전')
               END  as date
        , P.CONTENT AS content
        , P.VIEWS AS views
        , P.SECRET as secret
        , P.SECRET_REPLY_ALLOW as secretReplyAllow
        , P.REPLY_ALLOW as replyAllow
    FROM GTC_BOARD_POST P 
    WHERE ID = ${req.params.id}`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    query = `UPDATE GTC_BOARD_POST
        SET VIEWS = VIEWS + 1
        WHERE ID = ${req.params.id}`;

    // 정상적으로 조회가 되었다면 조회수 +1
    conn.query(query, (err2) => {
      if (err2) throw err2;
      res.send(rows);
    });
  });
});

router.use('/reply', authMiddleware);
router.post('/reply', (req, res) => {
  const data = req.body;
  const query = `INSERT INTO GTC_BOARD_REPLY (
      ID,
      BP_ID,
      ID_REPLY,
      ID_UPPER,
      WRITER,
      DATE,
      CONTENT,
      DEPTH
    ) VALUES (
      (SELECT ID FROM (SELECT IFNULL(MAX(ID)+1,1) AS ID FROM GTC_BOARD_REPLY) as temp),
      ${data.bpId},
      IFNULL(${data.replyId}, (SELECT ID FROM (SELECT IFNULL(MAX(ID)+1,1) AS ID FROM GTC_BOARD_REPLY) as temp)),
      IFNULL((SELECT ID_UPPER FROM (SELECT MIN(ID_UPPER) AS ID_UPPER FROM GTC_BOARD_REPLY WHERE ID = ${data.replyId}) as temp),(SELECT ID FROM (SELECT IFNULL(MAX(ID)+1,1) AS ID FROM GTC_BOARD_REPLY) as temp)),
      '${data.writer}', 
      sysdate(), 
      '${data.text}',
      ${data.depth}
    );
  `;

  conn.query(query, (err) => {
    if (err) throw err;
    res.send(true);
  });
});

router.get('/reply', (req, res) => {
  const data = req.query;
  const query = `SELECT 
    A.ID AS id
    , A.ID_REPLY AS idReply
    , A.ID_UPPER AS idUpper
    , C.WRITER AS idPostWriter
    , A.WRITER AS idWriter
    , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = A.WRITER) AS writer
    , CASE WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇초 전'
        WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE,A.DATE, SYSDATE()),'분 전')
        WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR,A.DATE, SYSDATE()),'시간 전')
        WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY,A.DATE, SYSDATE()),'일 전')
        WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH,A.DATE, SYSDATE()),'달 전')
       ELSE CONCAT(TIMESTAMPDIFF(YEAR,A.DATE, SYSDATE()),'년 전')
    END  as date
    , CASE WHEN B.DEPTH >= 2 THEN (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = B.WRITER) 
        ELSE NULL 
        END AS replyWriterName
    , A.CONTENT as content
    , A.DEPTH as depth
    , (SELECT COUNT(*) FROM GTC_BOARD_REPLY_LIKE WHERE ID = A.ID) AS likeCount
    FROM GTC_BOARD_REPLY A, GTC_BOARD_REPLY B, GTC_BOARD_POST C
  WHERE A.BP_ID = '${data.bpId}'
  AND B.ID = A.ID_REPLY
  AND C.ID = A.BP_ID
  ORDER BY A.ID_UPPER, A.ID`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.put('/reply', (req, res) => {
  const data = req.query;
  const query = `UPDATE `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// 댓글 좋아요
router.use('/reply/like', authMiddleware);
router.post('/reply/like', (req, res) => {
  const data = req.body;
  let query = `SELECT COUNT(*) AS count FROM GTC_BOARD_REPLY_LIKE
    WHERE ID=${data.id}
    AND U_ID=${data.uId}`;
  conn.query(query, (err, rows) => {
    if (err) throw err;

    // 이미 해당 댓글에 해당 유저가 좋아요를 누름.
    if (rows[0].count === 1) {
      res.send(2);
    } else {
      query = `INSERT INTO GTC_BOARD_REPLY_LIKE
        VALUES (
          ${data.id},
          ${data.uId}
        )`;

      conn.query(query, (err2) => {
        if (err2) throw err2;

        res.send(1);
      });
    }
  });
});

module.exports = router;
