const express = require('express');

const router = express.Router();
const db = require('../db_con')();

const conn = db.init();

router.get('/post', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT ID AS postId, TITLE AS postTitle, date_format(DATE, '%Y-%m-%d %H:%i:%s') AS postDate, VIEWS AS postViews
    FROM GTC_BOARD_POST
    WHERE WRITER='${userId}'
    `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(rows);
    } else {
      res.send(rows);
    }
  });
});

router.get('/reply', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT GBP.ID AS postId, GBP.TITLE AS postTitle, GBR.ID AS replyId, GBR.CONTENT AS replyContent, GBR.DATE
    FROM GTC_BOARD_POST GBP LEFT JOIN GTC_BOARD_REPLY GBR
    ON GBP.ID = GBR.BP_ID
    WHERE GBR.WRITER = ${userId}
    `;

  conn.query(query, (err, rows) => {
    // 댓글 콘텐츠는 3줄에서 끊기로
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(rows);
    } else {
      res.send(rows);
    }
  });
});

// 나중에 해당 포스트 제목 받아오는 쿼리도 넣어야 함.
router.get('/favorite', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT GUFP.ID AS id, GUFP.USER_ID AS f_id, GUFP.POST_ID AS nickname, date_format(GUFP.DATE, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date FROM GTC_USER_FAVORITE_POST GUFP LEFT JOIN GTC_USER GU
    ON GUFP.USER_ID = GU.ID
    WHERE GUFP.USER_ID='${userId}'
    `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(rows);
    } else {
      res.send(rows);
    }
  });
});

// 배열아닌 단일로 수정 필요(settings -> postlocker 옮겨짐)
router.delete('/favorite', (req, res) => {
  const data = req.body;

  const query = `DELETE FROM GTC_USER_FAVORITE_POST
    WHERE ID IN (${data.list.join()})
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});

module.exports = router;
