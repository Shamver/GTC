const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const UPDATE_USER_DELETE = `
  UPDATE GTC_USER
  SET DELETE_DTTM = SYSDATE()
  WHERE ID = :USER_ID
`;

const UPDATE_USER_INFO = `
  UPDATE GTC_USER
  SET 
    NICKNAME = ':NICKNAME'
    , BIRTH_DT = ':BIRTH_DT'
    , GENDER_CD = ':GENDER_CD'
    , PROFILE_FL = :PROFILE_FL
  WHERE ID = :USER_ID
`;

const GET_USER_PROFILE = `
  SELECT COUNT(GTC_POST.CONTENT)
  FROM GTC_POST
  WHERE GTC_POST.USER_ID = :USER_ID
`;

router.delete('/withdrawal', (req, res) => {
  const { userId } = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_USER_DELETE,
      {
        USER_ID: userId,
      },
    )
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '회원탈퇴 완료',
        });
      }),
  ).then(() => {
    info('[UPDATE, DELETE /api/user/withdrawal] 유저 회원탈퇴');
  });
});

router.put('/info', (req, res) => {
  const {
    nickname, birth, gender, profileYN, userId,
  } = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_USER_INFO,
      {
        USER_ID: userId,
        NICKNAME: nickname,
        BIRTH_DT: birth,
        GENDER_CD: gender,
        PROFILE_FL: profileYN,
      },
    )
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '회원정보 수정완료',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/user/info] 유저 정보 업데이트');
  });
});

router.post('/profile', (req, res) => {
  const { userId } = req.body;

  Database.execute(
    (database) => database.query(
      GET_USER_PROFILE,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          DATA: rows[0],
        });
      }),
  ).then(() => {
    info('[SELECT, POST /api/user/profile] 유저 프로필 조회');
  });
});

module.exports = router;
