const express = require('express');

const router = express.Router();
const db = require('../../dbConnection')();
const authMiddleware = require('../../middleware/auth');

const conn = db.init();

router.get('/', (req, res) => {
  const data = req.query;
  const query = `SELECT P.ID AS id
        , P.TITLE AS title
        , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.WRITER) AS writer
        , IF(BC_ID = 'FREE','자유','그외') as categoryName
        , P.DEPTH AS depth
        , if(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(P.DATE, '%Y%m%d'),DATE_FORMAT(P.DATE, '%H:%i'),DATE_FORMAT(P.DATE, '%m-%d')) AS date
        , ( SELECT COUNT(*) AS count FROM GTC_BOARD_POST_RECOMMEND WHERE ID=P.id AND TYPE='R01') as recommendCount
        , ( SELECT COUNT(*) AS count FROM GTC_BOARD_REPLY WHERE BP_ID=P.id) as replyCount
    FROM GTC_BOARD_POST P 
    WHERE B_ID = '${data.board.replace('/', '')}'
    ORDER BY P.DATE DESC`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.use('/', authMiddleware);
router.post('/', (req, res) => {
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

// 게시글 추천
router.post('/recommend', (req, res) => {
  const data = req.body;
  let query = `SELECT COUNT(*) AS count FROM GTC_BOARD_POST_RECOMMEND
    WHERE ID=${data.id}
    AND U_ID=${data.uId}`;
  conn.query(query, (err, rows) => {
    if (err) throw err;

    // 이미 해당 댓글에 해당 유저가 좋아요를 누름.
    if (rows[0].count === 1) {
      res.send(2);
    } else {
      query = `INSERT INTO GTC_BOARD_POST_RECOMMEND
        VALUES (
          ${data.id},
          ${data.uId},
          '${data.type}'
        )`;

      conn.query(query, (err2) => {
        if (err2) throw err2;

        res.send(1);
      });
    }
  });
});

router.get('/mine', (req, res) => {
  const { userId } = req.query;
  const query = `SELECT ID AS postId, TITLE AS postTitle, date_format(DATE, '%Y-%m-%d %H:%i:%s') AS postDate, VIEWS AS postViews
    FROM GTC_BOARD_POST
    WHERE WRITER = ${userId}
    `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(rows.reverse());
    } else {
      res.send(rows);
    }
  });
});

router.get('/:id', (req, res) => {
  let query = `SELECT P.ID AS id
        , B_ID AS board
        , if(B_ID = 'FREE','자유게시판','그외') as boardName
        , BC_ID AS category
        , if(BC_ID = 'FREE','자유','그외') as categoryName
        , P.TITLE AS title
        , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = P.WRITER) AS writer
        , P.DEPTH AS depth
        , ( SELECT COUNT(*) AS count FROM GTC_BOARD_POST_RECOMMEND WHERE ID=P.id AND TYPE='R01') as recommendCount
        , ( SELECT COUNT(*) AS count FROM GTC_BOARD_POST_RECOMMEND WHERE ID=P.id AND TYPE='R02') as notRecommendCount
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

module.exports = router;
