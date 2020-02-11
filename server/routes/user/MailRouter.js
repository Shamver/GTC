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
    , (SELECT Ceil(COUNT(*)/${MaxCount}) FROM GTC_USER_POINT WHERE USER_ID = ${userId}) AS pageCount
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

router.post('/', (req, res) => {
  const { fromId, targetName, message } = req.body;

  const query = `
    SELECT ID as targetId
    FROM GTC_USER
    WHERE NICKNAME = '${targetName}'
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      const { targetId } = rows[0];
      const query2 = `
        INSERT INTO GTC_USER_MAIL VALUES(
        (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_MAIL) as temp)
        , ${fromId}
        , ${targetId}
        , '${message}'
        , sysdate()
        , 'N'
        )
      `;

      conn.query(query2, (err2) => {
        if (err2) throw err2;
        res.send({
          SUCCESS: true,
          MESSAGE: '✔ 쪽지가 전송되었습니다.',
        });
      });
    } else {
      res.send({
        SUCCESS: false,
        MESSAGE: '😓 존재하지 않는 닉네임입니다ㅠ',
      });
    }
  });
});

module.exports = router;
