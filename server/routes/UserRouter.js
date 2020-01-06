const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const db = require('../db_con')();

const conn = db.init();

router.get('/alert', (req, res) => {
  const { userId } = req.query;

  const query = `
    SELECT GUA.ID AS id, GUA.TYPE AS type, GUA.READED AS readed, TIMESTAMPDIFF(minute, date_format(GUA.READED_DATE, '%Y-%m-%d %H:%i'), date_format(sysdate(), '%Y-%m-%d %H:%i')) AS readedDate,
    GBP.ID AS postId, GBP.TITLE AS postTitle,
    GBR.ID AS replyId, GBR.CONTENT AS replyContent, TIMESTAMPDIFF(minute, date_format(GBR.DATE, '%Y-%m-%d %H:%i'), date_format(sysdate(), '%Y-%m-%d %H:%i')) AS replyDate,
    GU.NICKNAME AS replyName
    FROM GTC_USER_ALERT GUA, GTC_BOARD_POST GBP, GTC_BOARD_REPLY GBR, GTC_USER GU
    WHERE GBP.ID = GUA.POST_ID and
    GBR.ID = GUA.REPLY_ID and
    GU.ID = GBR.WRITER and
    GBP.WRITER = ${userId}
    `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      let returnRows = rows.filter((v) => (v.readedDate < 1441));
      returnRows = returnRows.map((v) => {
        let txt;
        if (v.replyDate < 60) {
          txt = `${v.replyDate}분 전`;
        } else if (v.replyDate < 1441) {
          txt = `${Math.floor(v.replyDate / 60)}시간 전`;
        } else {
          txt = `${Math.floor(v.replyDate / 1440)}일 전`;
        }

        return {
          ...v,
          replyDate: txt,
        };
      });
      res.send(returnRows.reverse());
    } else {
      res.send(rows);
    }
  });
});

router.put('/alert', (req, res) => {
  const { id } = req.body;

  const query = `
    UPDATE GTC_USER_ALERT
    SET READED = 'Y', READED_DATE = sysdate()
    WHERE id = ${id}
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

router.delete('/alert', (req, res) => {
  const { type, id = null } = req.body;

  console.log(type, id);

  res.send(200);
});

module.exports = router;
