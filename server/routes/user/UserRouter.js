const express = require('express');

const router = express.Router();

const db = require('../../dbConnection')();

const conn = db.init();

const { get } = require('../../middleware/latelyCookie');

router.delete('/withdrawal', (req, res) => {
  const { userId } = req.body;

  const query = `
    UPDATE GTC_USER
    SET DELETED_DATE = sysdate()
    WHERE ID = '${userId}';
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});

router.put('/info', (req, res) => {
  const {
    nickname, birth, gender, profileYN, userId,
  } = req.body;

  const query = `UPDATE GTC_USER
    SET NICKNAME = '${nickname}',
    BIRTH = '${birth}',
    GENDER = '${gender}',
    PROFILE_YN = '${profileYN}'
    WHERE ID = ${userId}`;

  conn.query(query, (err) => {
    if (err) throw err;

    res.send(200);
  });
});

router.get('/lately', (req, res) => {
  const { lately } = req.cookies;

  const data = get(lately);

  const query = `SELECT
  ID AS postId
  , TITLE AS postTitle
  FROM GTC_BOARD_POST
  WHERE ID IN (${data})
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});

module.exports = router;
