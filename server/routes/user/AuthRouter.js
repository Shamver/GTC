const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const authMiddleware = require('../../middleware/auth');

const { upload, uploadHandler } = require('../../middleware/photoUpload');

const { info } = require('../../log-config');
const Database = require('../../Database');

const async = require('../../middleware/async');

const SELECT_USER_FROM_TEL_EMAIL = `
  SELECT 
    COUNT(*) AS count
  FROM GTC_USER
  WHERE 
    (TEL_NO = ':TEL_NO'
    OR EMAIL = ':EMAIL')
    AND DELETE_FL = 0
`;

const INSERT_NEW_USER = `
  INSERT INTO GTC_USER (
    EMAIL
    , NAME
    , NICKNAME
    , TEL_NO
    , BIRTH_DT
    , GT_NICKNAME
    , GENDER_CD
    , CRT_DTTM
  ) VALUES (
    ':EMAIL'
    , ':NAME'
    , ':NICKNAME'
    , ':TEL_NO'
    , ':BIRTH_DT'
    , ':GT_NICKNAME'
    , ':GENDER_CD'
    , sysdate()
  )
`;

const SELECT_USER_FROM_EMAIL = `
  SELECT 
    U.ID AS id
    , U.EMAIL AS email
    , U.NAME AS name
    , U.GT_NICKNAME AS gtNickname
    , U.NICKNAME AS nickname
    , U.TEL_NO AS tel
    , DATE_FORMAT(U.BIRTH_DT, '%Y-%m-%d') AS birth
    , U.GENDER_CD AS gender
    , U.PROFILE_FL AS profileYN
    , IFNULL(U.DELETE_DTTM, NULL) AS deletedDate
    , U.DELETE_FL AS deleteFl
    , U.OPERATOR_FL AS operatorYN
    , U.ADMIN_FL AS adminYN
    , U.PROFILE AS profile
    , U.BANNED_FL AS banFl
    , (SELECT BAN_REASON FROM GTC_USER_BAN B WHERE B.USER_ID = U.ID AND DELETE_FL = 0) AS banReason
    , (SELECT SUSPEND_BAN_FL FROM GTC_USER_BAN B WHERE B.USER_ID = U.ID AND DELETE_FL = 0) AS suspendBanFl
    , (SELECT DATE_FORMAT(BAN_TERM, '%Y-%m-%d') FROM GTC_USER_BAN B WHERE B.USER_ID = U.ID AND DELETE_FL = 0) AS banTerm
  FROM GTC_USER U
  WHERE U.EMAIL = ':EMAIL'
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
        const resultData = rows.filter(
          ({ deleteFl, deletedDate }) => deleteFl === 0 && deletedDate === null,
        );
        if (resultData.length === 1) {
          const {
            id, nickname, gtNickname, deletedDate,
            email, tel, birth, gender, profileYN, name,
            operatorYN, adminYN, profile, banFl, deleteFl,
            banReason,
          } = resultData[0];
          if (deletedDate === null) {
            if (banFl !== 1) {
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
                  operatorYN,
                  adminYN,
                  profile,
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
                message: banReason,
                result: resultData[0],
              });
            }
          } else if (deleteFl === 0) {
            res.json({
              success: true,
              code: 3,
              message: '해당 아이디는 회원탈퇴 상태입니다. 탈퇴일로부터 30일이 지난 후에 재가입해주세요.',
            });
          }
        } else {
          res.json({
            success: true,
            code: 4,
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

router.post('/test', upload.fields([{ name: 'images' }]), uploadHandler, async(async (req, res) => {
  res.json(req.photo);
}));

module.exports = router;
