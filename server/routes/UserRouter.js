const express = require('express');

const router = express.Router();

const db = require('../db_con')();

const conn = db.init();

router.post('/register', (req, res) => {
  const data = req.body;
  let query = `SELECT COUNT(*) AS count FROM GTC_USER
    WHERE U_TEL='${data.tel}'
    or U_EMAIL='${data.email}'`;

  console.log(query);
  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows[0].count && rows[0].count >= 1) {
      res.send(rows);
    } else {
      // 겹치는 명의가 없는 경우에는 유저 insert
      query = `INSERT INTO GTC_USER VALUES(
        (SELECT * FROM (SELECT IFNULL(MAX(U_ID)+1,1) FROM GTC_USER) as temp),
        '${data.email}',
        '${data.password}',
        '${data.name}',
        '${data.nickname}',
        '${data.tel}',
        '${data.birth}',
        '${data.gender}',
        '${data.gtNickname}',
        sysdate()
        )
      `;

      conn.query(query, (err2, rows2) => {
        if (err2) throw err2;
        console.log(rows2);
        res.send(rows2);
      });
    }
  });
});

router.post('/login', (req, res) => {
  const data = req.body;
  const query = `SELECT ID AS id, EMAIL AS email, NAME AS name, GT_NICKNAME AS gtNickname, NICKNAME AS nickname FROM GTC_USER
    WHERE EMAIL='${data.email}'
    AND PASSWORD='${data.password}'`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      req.session.user = {
        id: rows[0].id,
        email: rows[0].email,
        name: rows[0].name,
        nickname: rows[0].nickname,
        gtNickname: rows[0].gtNickname,
      };
      res.send(rows);
    } else {
      res.send(rows);
    }
  });
});

router.post('/sessionCheck', (req, res) => {
  if (req.session.user) {
    res.send({
      type: 'LOGGED',
      userInfo: req.session.user,
    });
  } else {
    res.send({
      type: 'NO_SESSION',
    });
  }
});

router.post('/logout', (req, res) => {
  delete req.session.user;
  res.send({
    type: 'LOGOUT',
  });
});

module.exports = router;
