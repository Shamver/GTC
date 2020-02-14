const express = require('express');

const router = express.Router();

const db = require('../../dbConnection')();

const conn = db.init();
const { info } = require('../../log-config');

router.get('/get', (req, res) => {
  const { userId } = req.query;

  const query = `
    SELECT 
    M.ID AS id
    , U.NICKNAME AS fromName
    , M.MESSAGE AS message
    , date_format(M.SENT_DATE, '%Y-%m-%d %H:%i:%s') AS date
    , IFNULL(date_format(M.READ_DATE, '%Y-%m-%d %H:%i:%s'), null) as readDate
    FROM GTC_USER_MAIL M, GTC_USER U
    WHERE M.TARGET_ID = ${userId} AND U.ID = M.FROM_ID AND M.DELETE_YN = 'N'
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

router.get('/sent', (req, res) => {
  const { userId } = req.query;

  const query = `
    SELECT
    M.ID AS id
    , U.NICKNAME AS targetName
    , M.MESSAGE AS message
    , date_format(M.SENT_DATE, '%Y-%m-%d %H:%i:%s') AS date
    , IFNULL(date_format(M.READ_DATE, '%Y-%m-%d %H:%i:%s'), null) as readDate
    FROM GTC_USER_MAIL M, GTC_USER U
    WHERE M.FROM_ID = ${userId} AND U.ID = M.TARGET_ID AND M.DELETE_YN = 'N'
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
      if (fromId === targetId) {
        res.send({
          SUCCESS: false,
          MESSAGE: '😓 본인에게는 쪽지를 보낼 수 없습니다!',
        });
      } else {
        const query2 = `
        INSERT INTO GTC_USER_MAIL VALUES(
        (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_MAIL) as temp)
        , ${fromId}
        , ${targetId}
        , '${message}'
        , sysdate()
        , null
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
      }
    } else {
      res.send({
        SUCCESS: false,
        MESSAGE: '😓 존재하지 않는 닉네임입니다ㅠ',
      });
    }
  });
});

router.put('/', (req, res) => {
  const data = req.body;
  const { userId, mailId } = data;
  const query = `
    UPDATE GTC_USER_MAIL
    SET READ_DATE = sysdate()
    WHERE (FROM_ID = ${userId} OR TARGET_ID = ${userId}) AND ID = ${mailId}
  `;

  conn.query(query, (err) => {
    if (err) throw err;
    res.send(200);
  });
});

router.delete('/', (req, res) => {
  const data = req.body;
  const {
    mailId, userId,
  } = data;

  const query = `UPDATE GTC_USER_MAIL
    SET DELETE_YN = 'Y'
    WHERE (FROM_ID = ${userId} OR TARGET_ID = ${userId}) AND ID = ${mailId}
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
