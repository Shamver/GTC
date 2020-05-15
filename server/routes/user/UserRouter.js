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

const GET_USER_POST_LIST = `
  SELECT A.ID AS postId
    , A.BOARD_CD AS postCd
    , A.CATEGORY_CD AS postCategory
    , A.TITLE AS postTitle
    , DATE_FORMAT(A.CRT_DTTM, '%Y-%m-%d') postCreated
    , (SELECT COUNT(GTC_COMMENT.ID) FROM GTC_COMMENT WHERE GTC_COMMENT.POST_ID = A.ID) AS postCommentCount
  FROM GTC_POST A
  WHERE A.USER_ID = :USER_ID
`
const GET_USER_COMMENT_LIST = `
  SELECT GTC_COMMENT.ID AS commentId
    , GTC_COMMENT.COMMENT_ID AS _commentId
    , GTC_COMMENT.POST_ID AS postCommentId
    , GTC_COMMENT.CONTENT AS commentContent
    , DATE_FORMAT(GTC_COMMENT.CRT_DTTM, '%Y-%m-%d') commentCreated
  FROM GTC_COMMENT
  WHERE GTC_COMMENT.USER_ID = :USER_ID
`

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

router.get('/profile/:writerId/post', (req, res) => {
    Database.execute(
      (database) => database.query(
        GET_USER_POST_LIST,
          {
            USER_ID: req.params.writerId,
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

router.get('/profile/:writerId/comment', (req, res) => {
    Database.execute(
      (database) => database.query(
        GET_USER_COMMENT_LIST,
          {
            USER_ID: req.params.writerId,
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
