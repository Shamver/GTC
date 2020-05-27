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

const INSERT_USER_NICKNAME = `
  INSERT INTO GTC_USER_NICKNAME (
    USER_ID
    , PREV_NICKNAME
    , CRT_DTTM
  ) VALUES (
    :USER_ID
    , ':PREV_NICKNAME'
    , SYSDATE()
  )
`;

const GET_USER_PROFILE = `
  SELECT GTC_USER.ID AS userId
    , GTC_USER.EMAIL AS userEmail
    , GTC_USER.NAME AS name
    , GTC_USER.NICKNAME AS nickname
    , DATE_FORMAT(GTC_USER.CRT_DTTM, '%Y-%m-%d') userCreated
    , (SELECT COUNT(GTC_POST.ID) FROM GTC_POST WHERE GTC_POST.USER_ID = :USER_ID) AS postCount
    , (SELECT COUNT(GTC_COMMENT.ID) AS 'cnt' FROM GTC_COMMENT WHERE GTC_COMMENT.USER_ID = :USER_ID) AS commentCount
  FROM GTC_USER
  WHERE GTC_USER.ID = :USER_ID
`;

const GET_USER_NICKNAME_HISTORY = `
  SELECT N.ID as id
    , N.USER_ID AS userId
    , N.PREV_NICKNAME AS nicknameHistory
    , CASE WHEN N.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇 초 전'
      WHEN N.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, N.CRT_DTTM, SYSDATE()),'분 전')
      WHEN N.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, N.CRT_DTTM, SYSDATE()),'시간 전')
    ELSE DATE_FORMAT(N.CRT_DTTM, '%m-%d')
  END AS nicknameChanged
    , (SELECT COUNT(GTC_USER_NICKNAME.ID) FROM GTC_USER_NICKNAME WHERE GTC_USER_NICKNAME.USER_ID = :USER_ID) AS changeCount
    , (SELECT CEIL(COUNT(*)/5) FROM GTC_USER_NICKNAME WHERE GTC_USER_NICKNAME.USER_ID = :USER_ID) AS rowCount
  FROM GTC_USER_NICKNAME N
  WHERE N.USER_ID = :USER_ID
  ORDER BY id DESC
  LIMIT :INDEX, 5
`;

const GET_USER_POST_LIST = `
  SELECT A.ID AS postId
    , A.BOARD_CD AS postCd
    , A.CATEGORY_CD AS postCategory
    , A.TITLE AS postTitle
    , CASE WHEN A.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇 초 전'
      WHEN A.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, A.CRT_DTTM, SYSDATE()),'분 전')
      WHEN A.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, A.CRT_DTTM, SYSDATE()),'시간 전')
    ELSE DATE_FORMAT(A.CRT_DTTM, '%m-%d')
  END AS postCreated
    , (SELECT COUNT(GTC_COMMENT.ID) FROM GTC_COMMENT WHERE GTC_COMMENT.POST_ID = A.ID) AS postCommentCount
    , (SELECT CEIL(COUNT(*)/5) FROM GTC_POST WHERE GTC_POST.USER_ID = :USER_ID) AS rowCount
  FROM GTC_POST A
  WHERE A.USER_ID = :USER_ID
  ORDER BY ID DESC
  LIMIT :INDEX, 5
`;

const GET_USER_COMMENT_LIST = `
  SELECT B.ID AS commentId
    , B.COMMENT_ID AS _commentId
    , B.POST_ID AS postCommentId
    , B.CONTENT AS commentContent
    , CASE WHEN B.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇 초 전'
      WHEN B.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, B.CRT_DTTM, SYSDATE()),'분 전')
      WHEN B.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, B.CRT_DTTM, SYSDATE()),'시간 전')
      WHEN B.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY, B.CRT_DTTM, SYSDATE()),'일 전')
      WHEN B.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH, B.CRT_DTTM, SYSDATE()),'달 전')
    ELSE CONCAT(TIMESTAMPDIFF(YEAR, B.CRT_DTTM, SYSDATE()),'년 전')
  END AS commentCreated
    , (SELECT CEIL(COUNT(*)/5) FROM GTC_COMMENT WHERE GTC_COMMENT.USER_ID = :USER_ID) AS rowCount
  FROM GTC_COMMENT B
  WHERE B.USER_ID = :USER_ID
  ORDER BY ID DESC
  LIMIT :INDEX, 5
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
    nickname, birth, gender, profileYN, userId, prevNickname,
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
      .then(() => database.query(
        INSERT_USER_NICKNAME,
        {
          USER_ID: userId,
          PREV_NICKNAME: prevNickname,
        },
      ))
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

router.get('/profile/:writerId', (req, res) => {
  Database.execute(
    (database) => database.query(
      GET_USER_PROFILE,
      {
        USER_ID: req.params.writerId,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '유저 프로필 조회',
          DATA: rows[0],
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/profile] 유저 프로필 조회');
  });
});

router.get('/profile/:writerId/nickname/:currentPage', (req, res) => {
  let { index } = req.query;
  index = (index === 1) ? 0 : (index - 1) * 5;

  Database.execute(
    (database) => database.query(
      GET_USER_NICKNAME_HISTORY,
      {
        USER_ID: req.params.writerId,
        INDEX: index,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '유저 닉네임 변경 이력 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/profile/nickname] 유저 닉네임 변경 이력 조회');
  });
});

router.get('/profile/:writerId/post/:currentPage', (req, res) => {
  let { index } = req.query;
  index = (index === 1) ? 0 : (index - 1) * 5;

  Database.execute(
    (database) => database.query(
      GET_USER_POST_LIST,
      {
        USER_ID: req.params.writerId,
        INDEX: index,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '유저 작성 글 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/profile/post] 유저 작성 글 조회');
  });
});

router.get('/profile/:writerId/comment/:currentPage', (req, res) => {
  let { index } = req.query;
  index = (index === 1) ? 0 : (index - 1) * 5;

  Database.execute(
    (database) => database.query(
      GET_USER_COMMENT_LIST,
      {
        USER_ID: req.params.writerId,
        INDEX: index,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '유저 작성 댓글 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/profile/comment] 유저 작성 댓글 조회');
  });
});

module.exports = router;
