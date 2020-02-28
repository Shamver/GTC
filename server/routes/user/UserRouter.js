const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');

const UPDATE_USER_DELETE = `
  UPDATE GTC_USER
  SET DELETED_DATE = sysdate()
  WHERE ID = :USER_ID;
`;

const UPDATE_USER_INFO = `
  UPDATE GTC_USER
  SET NICKNAME = ':NICKNAME',
  BIRTH = ':BIRTH',
  GENDER = ':GENDER',
  PROFILE_YN = ':PROFILE_YN'
  WHERE ID = :USER_ID
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
        res.send({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '회원탈퇴 완료',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[UPDATE, DELETE /api/user/withdrawal] 유저 회원탈퇴');
  }).catch((err) => {
    // 트랜잭션 중 에러가 났을때 처리.
    error(err.message);

    // Database 에서 보여주는 에러 메시지
    if (err.sqlMessage) {
      error(err.sqlMessage);
    }

    // 실행된 sql
    if (err.sql) {
      error(err.sql);
    }
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
        BIRTH: birth,
        GENDER: gender,
        PROFILE_YN: profileYN,
      },
    )
      .then(() => {
        res.send({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '회원정보 수정완료',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[UPDATE, PUT /api/user/info] 유저 정보 업데이트');
  }).catch((err) => {
    // 트랜잭션 중 에러가 났을때 처리.
    error(err.message);

    // Database 에서 보여주는 에러 메시지
    if (err.sqlMessage) {
      error(err.sqlMessage);
    }

    // 실행된 sql
    if (err.sql) {
      error(err.sql);
    }
  });
});

module.exports = router;
