const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const db = require('../../dbConnection')();
const authMiddleware = require('../../middleware/auth');

const conn = db.init();

router.post('/register', (req, res) => {
  const data = req.body;
  let query = `SELECT COUNT(*) AS count FROM GTC_USER
    WHERE TEL='${data.tel}'
    or EMAIL='${data.email}'`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows[0].count && rows[0].count >= 1) {
      res.send(rows);
    } else {
      // 겹치는 명의가 없는 경우에는 유저 insert
      query = `INSERT INTO GTC_USER VALUES(
        (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER) as temp),
        '${data.email}',
        '${data.name}',
        '${data.nickname}',
        '${data.tel}',
        '${data.birth}',
        '${data.gender.toUpperCase()}',
        '${data.gtNickname}',
        sysdate(),
        null
        )
      `;

      conn.query(query, (err2, rows2) => {
        if (err2) throw err2;
        if (rows2.affectedRows >= 1) {
          res.send(rows2.affectedRows);
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  const data = req.body;
  const secret = req.app.get('jwt-secret');
  const query = `SELECT 
    ID AS id
    , EMAIL AS email
    , NAME AS name
    , GT_NICKNAME AS gtNickname
    , NICKNAME AS nickname 
    , DELETED_DATE AS deletedDate
    FROM GTC_USER
    WHERE EMAIL='${data.email}'`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length === 1) {
      // req.session.user = {
      //   email: rows[0].email,
      //   name: rows[0].name,
      //   nickname: rows[0].nickname,
      //   gtNickname: rows[0].gtNickname,
      // };
      if (rows[0].deletedDate === null) {
        jwt.sign(
          {
            _id: rows[0].email,
            id: rows[0].id,
            username: rows[0].nickname,
          },
          secret,
          {
            expiresIn: '7d',
            issuer: 'GTC',
            subject: 'userInfo',
          }, (err2, token) => {
            if (err2) throw (err2);
            res.cookie('authToken', token, { httpOnly: true });
            res.json({
              LOGIN_SUCCESS: true,
              MESSAGE: '😊 로그인 완료!',
            });
          },
        );
      } else {
        res.send({
          LOGIN_SUCCESS: false,
          MESSAGE: '해당 아이디는 회원탈퇴 상태입니다.\n탈퇴일로부터 30일이 지난 후에 재가입해주세요.',
        });
      }
    } else {
      res.send({
        LOGIN_SUCCESS: false,
        MESSAGE: '해당 이메일로 가입된 계정이 존재하지 않습니다.\n회원가입 후 진행해주세요.',
      });
    }
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.send({
    type: 'LOGOUT',
  });
});

router.use('/check', authMiddleware);
router.get('/check', (req, res) => {
  res.json({
    success: true,
    info: req.decoded,
  });
});

module.exports = router;
