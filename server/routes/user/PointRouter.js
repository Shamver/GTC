const express = require('express');

const router = express.Router();

const db = require('../../dbConnection')();

const conn = db.init();
const { info } = require('../../log-config');

router.get('/', (req, res) => {
  const { userId } = req.query;
  let { currentPage } = req.query;
  currentPage = currentPage || 1;

  const MaxCount = 30;

  const query = `
    SELECT 
    @rownum:=@rownum+1 as rn
    , (SELECT Ceil(COUNT(*)/${MaxCount}) FROM GTC_USER_POINT) AS pageCount
    , ID AS id
    , TYPE AS type
    , POST_ID AS postId
    , REPLY_ID AS replyId
    , COST AS point
    , date_format(DATE, '%Y-%m-%d %H:%i:%s') AS date
    FROM GTC_USER_POINT, (SELECT @ROWNUM := ${(currentPage - 1) * MaxCount}) AS TEMP
    WHERE USER_ID = ${userId}
    LIMIT ${(currentPage - 1) * MaxCount}, ${MaxCount}
  `;

  info(query);

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.send(rows.reverse());
    } else {
      res.send([]);
    }
  });
});

router.get('/sum', (req, res) => {
  const { userId } = req.query;

  const query = `
    SELECT SUM(COST) AS point
    FROM GTC_USER_POINT
    WHERE USER_ID = ${userId};
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.send(rows[0].point);
    } else {
      res.send(0);
    }
  });
});

module.exports = router;
