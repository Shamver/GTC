const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const authMiddleware = require('../../middleware/auth');

const { info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_USER_FROM_TEL_EMAIL = `
  SELECT 
    COUNT(*) AS count
  FROM GTC_USER
  WHERE 
    TEL_NO = ':TEL_NO'
    OR EMAIL = ':EMAIL'
`;

const INSERT_NEW_USER = `
  INSERT INTO GTC_USER (
    ID
    , EMAIL
    , NAME
    , NICKNAME
    , TEL_NO
    , BIRTH_DT
    , GT_NICKNAME
    , GENDER_CD
    , CRT_DTTM
  ) VALUES (
    (SELECT * FROM (SELECT IFNULL(MAX(ID) + 1, 1) FROM GTC_USER) as temp)
    , ':EMAIL'
    , ':NAME'
    , ':NICKNAME'
    , ':TEL_NO'
    , ':BIRTH_DT'
    , ':GT_NICKNAME'
    , ':GENDER_CD'
    , SYSDATE()
  )
`;

const SELECT_USER_FROM_EMAIL = `
  SELECT 
    ID AS id
    , EMAIL AS email
    , NAME AS name
    , GT_NICKNAME AS gtNickname
    , NICKNAME AS nickname 
    , TEL_NO AS tel
    , DATE_FORMAT(BIRTH_DT, '%Y-%m-%d') AS birth
    , GENDER_CD AS gender
    , PROFILE_FL AS profileYN
    , IFNULL(DELETE_DTTM, NULL) AS deletedDate
  FROM GTC_USER
  WHERE EMAIL = ':EMAIL'
`;

router.post('/register', (req, res) => {
  const {
    tel, email, nickname, name, birth, gender, gtNickname,
  } = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_USER_FROM_TEL_EMAIL,
      {
        TEL_NO: tel,
        EMAIL: email,
      },
    )
      .then((rows) => {
        if (rows[0].count && rows[0].count >= 1) {
          res.json({
            success: true,
            code: 2,
            message: '동일한 명의나 카카오 계정으로 이미 계정이 생성되어있습니다.',
            result: rows,
          });
          throw new Error('동일한 명의나 카카오 계정으로 이미 계정이 생성되어있습니다.');
        } else {
          return database.query(
            INSERT_NEW_USER,
            {
              TEL_NO: tel,
              EMAIL: email,
              NICKNAME: nickname,
              NAME: name,
              BIRTH_DT: birth,
              GENDER_CD: gender.toUpperCase(),
              GT_NICKNAME: gtNickname,
            },
          );
        }
      })
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '가입이 완료되었습니다.',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/user/register] 유저 회원가입');
  });
});

router.post('/login', (req, res) => {
  const data = req.body;
  const secret = req.app.get('jwt-secret');

  Database.execute(
    (database) => database.query(
      SELECT_USER_FROM_EMAIL,
      {
        EMAIL: data.email,
      },
    )
      .then((rows) => {
        if (rows.length === 1) {
          const resultData = rows[0];
          const {
            id, nickname, gtNickname, deletedDate,
            email, tel, birth, gender, profileYN, name,
          } = resultData;
          if (deletedDate === null) {
            jwt.sign(
              {
                id,
                name,
                username: nickname,
                gtName: gtNickname,
                email,
                tel,
                birth,
                gender,
                profileYN,
              },
              secret,
              {
                expiresIn: '1d',
                issuer: 'GTC',
                subject: 'userInfo',
              }, (err2, token) => {
                if (err2) throw (err2);
                res.cookie('authToken', token, { httpOnly: true });
                res.json({
                  success: true,
                  code: 1,
                  message: '😊 로그인 완료!',
                });
              },
            );
          } else {
            res.json({
              success: true,
              code: 2,
              message: '해당 아이디는 회원탈퇴 상태입니다. 탈퇴일로부터 30일이 지난 후에 재가입해주세요.',
            });
          }
        } else {
          res.json({
            success: true,
            code: 3,
            message: '해당 이메일로 가입된 계정이 존재하지 않습니다. 회원가입 후 진행해주세요.',
          });
        }
      }),
  ).then(() => {
    info('[SELECT, POST /api/user/login] 유저 로그인');
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({
    success: true,
    code: 1,
    message: '😊 로그아웃 완료!',
  });
});

router.use('/check', authMiddleware);
router.get('/check', (req, res) => {
  res.json({
    success: true,
    code: 1,
    message: '토큰 체크 완료',
    result: req.decoded,
  });
});

module.exports = router;
