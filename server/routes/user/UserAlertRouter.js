const express = require('express');

const router = express.Router();

const db = require('../../db_con')();

const conn = db.init();

const filter = require('../../middleware/content');

router.get('/alert', (req, res) => {
  const { userId, updateYN } = req.query;

  const query = `
    SELECT GUA.ID AS id, GUA.TYPE AS type, GUA.READ_YN AS isRead,
    GBP.ID AS postId, GBP.TITLE AS postTitle,
    GBR.ID AS replyId, GBR.CONTENT AS replyContent,
    CASE WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇초 전'
                    WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, GBR.DATE, SYSDATE()),'분 전')
                    WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, GBR.DATE, SYSDATE()),'시간 전')
                    WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY, GBR.DATE, SYSDATE()),'일 전')
                    WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH, GBR.DATE, SYSDATE()),'달 전')
                   ELSE CONCAT(TIMESTAMPDIFF(YEAR,GBR.DATE, SYSDATE()),'년 전')
               END  as replyDate,
    GU.NICKNAME AS replyName
    FROM GTC_USER_ALERT GUA, GTC_BOARD_POST GBP, GTC_BOARD_REPLY GBR, GTC_USER GU
    WHERE GBP.ID = GUA.POST_ID and
    GBR.ID = GUA.REPLY_ID and
    GU.ID = GBR.WRITER and
    GBP.WRITER = ${userId} and
    GUA.SHOW_YN = 'Y' and
    TIMESTAMPDIFF(minute, date_format(GUA.READ_DATE, '%Y-%m-%d %H:%i'), date_format(sysdate(), '%Y-%m-%d %H:%i')) < 1441
    `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      const returnRows = rows.map((v) => ({
        ...v,
        replyContent: filter(v.replyContent),
      }));
      if (updateYN === 'Y') {
        res.send(returnRows.reverse());
      } else {
        setTimeout(() => {
          res.send(returnRows.reverse());
        }, 500);
      }
    } else {
      res.send(rows);
    }
  });
});

router.put('/alert', (req, res) => {
  const { id } = req.body;

  const query = `
    UPDATE GTC_USER_ALERT
    SET READ_YN = 'Y', READ_DATE = sysdate()
    WHERE id in (${id.join()})
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
  const { id } = req.body;

  const query = `
    UPDATE GTC_USER_ALERT
    SET SHOW_YN = 'N'
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

module.exports = router;
