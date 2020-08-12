const express = require('express');

const router = express.Router();

const { upload, uploadHandler } = require('../../middleware/photoUpload');

const async = require('../../middleware/async');

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
    , PROFILE_FL = ':PROFILE_FL'
    , PROFILE = IF(':PROFILE'='', GTC_USER.PROFILE, ':PROFILE')
    , GT_NICKNAME = ':GT_NICKNAME'
  WHERE ID = :USER_ID
`;

const INSERT_USER_GT_NICKNAME = `
  INSERT INTO GTC_USER_GT_NICKNAME (
    USER_ID
    , PREV_GT_NICKNAME
    , CRT_DTTM
  ) VALUES (
    :USER_ID
    , ':PREV_GT_NICKNAME'
    , SYSDATE()
  )
`;

const GET_USER_PROFILE = `
  SELECT GTC_USER.ID AS userId
    , GTC_USER.EMAIL AS userEmail
    , GTC_USER.NAME AS name
    , GTC_USER.NICKNAME AS nickname
    , DATE_FORMAT(GTC_USER.CRT_DTTM, '%Y-%m-%d') userCreated
    , (SELECT COUNT(GTC_USER_NICKNAME.ID) FROM GTC_USER_NICKNAME WHERE GTC_USER_NICKNAME.USER_ID = :USER_ID) AS changeCount
    , (SELECT COUNT(GTC_POST.ID) FROM GTC_POST WHERE GTC_POST.USER_ID = :USER_ID) AS postCount
    , (SELECT COUNT(GTC_COMMENT.ID) AS 'cnt' FROM GTC_COMMENT WHERE GTC_COMMENT.USER_ID = :USER_ID) AS commentCount
    , GTC_USER.PROFILE AS profile
    , GTC_USER.PROFILE_FL AS profileFl
  FROM GTC_USER
  WHERE GTC_USER.ID = :USER_ID
`;

const GET_USER_GT_NICKNAME_HISTORY = `
  SELECT N.ID as id
    , N.USER_ID AS userId
    , N.PREV_GT_NICKNAME AS nicknameHistory
    , CASE WHEN N.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇 초 전'
      WHEN N.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, N.CRT_DTTM, SYSDATE()),'분 전')
      WHEN N.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, N.CRT_DTTM, SYSDATE()),'시간 전')
    ELSE DATE_FORMAT(N.CRT_DTTM, '%m-%d')
  END AS nicknameChanged
    , (SELECT COUNT(GTC_USER_GT_NICKNAME.ID) FROM GTC_USER_GT_NICKNAME WHERE GTC_USER_GT_NICKNAME.USER_ID = :USER_ID) AS changeCount
    , (SELECT CEIL(COUNT(*)/5) FROM GTC_USER_GT_NICKNAME WHERE GTC_USER_GT_NICKNAME.USER_ID = :USER_ID) AS rowCount
  FROM GTC_USER_GT_NICKNAME N
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

const SELECT_ALL_USER_BANNED = `
  SELECT U.ID AS userId
    , U.EMAIL AS userEmail
    , U.NAME AS userName
    , U.NICKNAME AS userNickName
    , U.GT_NICKNAME AS GTName
    , B.REPORT_ID AS reportId
    , B.SUSPEND_BAN_FL AS suspendBanFl
    , B.TEMP_BAN_FL AS tempBanFl
    , B.BAN_REASON AS reason
    , DATE_FORMAT(B.BAN_TERM,'%Y-%m-%d') AS banTerm
    , DATE_FORMAT(B.CRT_DTTM,'%Y-%m-%d') AS banDate
  FROM GTC_USER AS U
  JOIN GTC_USER_BAN AS B
  ON U.ID = B.USER_ID;
`;

const SELECT_USER_BANNED = `
  SELECT *
  FROM GTC_USER_BAN
  WHERE USER_ID = :USER_ID;
`;

const INSERT_USER_BAN = `
  INSERT INTO GTC_USER_BAN (
    USER_ID
    , REPORT_ID
    , SUSPEND_BAN_FL
    , TEMP_BAN_FL
    , BAN_TERM
    , BAN_REASON
  ) VALUES (
    :USER_ID
    , :REPORT_ID
    , IF(':ACTION_TYPE' = 'BAN', 1, 0)
    , IF(':ACTION_TYPE' = 'BAN2', 1, 0)
    , ':BAN_TERM'
    , ':BAN_REASON'
  )
`;

const UPDATE_USER_BAN_FL = `
  UPDATE GTC_USER
  SET
    BANNED_FL = :BAN_FL
  WHERE ID = :USER_ID
`;

const UPDATE_USER_BAN_CANCEL = `
  DELETE FROM GTC_USER_BAN
  WHERE USER_ID = :USER_ID
`;

const UPDATE_REPORT_CANCEL = `
  UPDATE GTC_REPORT
  SET
    CANCEL_FL = 1,
    MFY_DTTM = SYSDATE()
  WHERE ID = (SELECT REPORT_ID FROM GTC_USER_BAN WHERE USER_ID = :USER_ID);
`;

const UPDATE_REPORT = `
  UPDATE GTC_REPORT
  SET
    MFY_DTTM = SYSDATE(),
    DISPOSE_FL = 1
  WHERE ID = :ID;
`;

const SELECT_USER_CAN_CHANGE_GT_NICKNAME = `
  SELECT
  IF(count(*) = 0, 1, 0) AS isCanChange
  FROM GTC_USER_GT_NICKNAME
  WHERE
    USER_ID = :USER_ID
    AND CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(), INTERVAL -30 DAY), '%Y-%m-%d %H:%i:%s');
`;

router.get('/ban', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_ALL_USER_BANNED,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '밴 유저 목록 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/banned] 밴 유저 목록 조회');
  });
});

router.post('/ban', (req, res) => {
  const {
    reportId, targetUserId, actionType, reason, term,
  } = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_USER_BANNED,
      {
        USER_ID: targetUserId,
      },
    )
      .then((rows) => {
        if (rows.length > 0) {
          res.json({
            success: true,
            code: 2,
            message: '😳 이미 해당 유저는 정지 상태입니다.',
          });
          throw new Error('이미 정지 상태입니다.');
        } else {
          return database.query(
            INSERT_USER_BAN,
            {
              USER_ID: targetUserId,
              REPORT_ID: reportId,
              ACTION_TYPE: actionType,
              BAN_TERM: term,
              BAN_REASON: reason,
            },
          );
        }
      })
      .then(() => database.query(
        UPDATE_REPORT,
        {
          ID: reportId,
        },
      ))
      .then(() => database.query(
        UPDATE_USER_BAN_FL,
        {
          BAN_FL: 1,
          USER_ID: targetUserId,
        },
      ))
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😊 해당 유저를 밴 처리 하였습니다.',
        });
      })
      .catch(() => {
        res.json({
          success: false,
          code: 1,
          message: '요청을 실패하였습니다.',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/user/banned] 신고 유저 밴 처리');
  });
});

router.put('/cancel', (req, res) => {
  const { userId } = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_REPORT_CANCEL,
      {
        USER_ID: userId,
      },
    )
      .then(() => database.query(
        UPDATE_USER_BAN_FL,
        {
          BAN_FL: 0,
          USER_ID: userId,
        },
      ))
      .then(() => database.query(
        UPDATE_USER_BAN_CANCEL,
        {
          USER_ID: userId,
        },
      ))
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😊 해당 유저의 밴 처리를 취소 하였습니다.',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/user/cancel] 신고 유저 밴 취소 처리');
  });
});

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
          success: true,
          code: 1,
          message: '회원탈퇴 완료',
        });
      }),
  ).then(() => {
    info('[UPDATE, DELETE /api/user/withdrawal] 유저 회원탈퇴');
  });
});

router.put('/info', upload.fields([{ name: 'images' }]), uploadHandler, async(async (req, res) => {
  const {
    nickname, birth, gender, profileYN, userId, prevGtNickname, gtNickname,
  } = req.body;

  const profile = req.photo.images && req.photo.images.length > 0 ? req.photo.images[0] : '';

  Database.execute(
    (database) => database.query(
      SELECT_USER_CAN_CHANGE_GT_NICKNAME,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        const { isCanChange } = rows[0];

        if (isCanChange) {
          return database.query(
            UPDATE_USER_INFO,
            {
              USER_ID: userId,
              NICKNAME: nickname,
              BIRTH_DT: birth,
              GENDER_CD: gender,
              PROFILE_FL: profileYN,
              PROFILE: profile,
              GT_NICKNAME: gtNickname,
            },
          );
        }
        return Promise.reject();
      })
      .then(() => database.query(
        INSERT_USER_GT_NICKNAME,
        {
          USER_ID: userId,
          PREV_GT_NICKNAME: prevGtNickname,
        },
      ))
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '회원정보 수정완료',
        });
      })
      .catch(() => {
        res.json({
          success: false,
          code: 1,
          message: '😳 그토 닉네임을 변경한지 30일이 되지 않았습니다.',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/user/info] 유저 정보 업데이트');
  });
}));

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
          success: true,
          code: 1,
          message: '유저 프로필 조회',
          result: rows[0],
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/profile] 유저 프로필 조회');
  });
});

router.get('/gtnickname/:userId', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_USER_CAN_CHANGE_GT_NICKNAME,
      {
        USER_ID: req.params.userId,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '유저 그토 닉네임 변경 가능 여부 조회',
          result: rows[0],
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/gtnickname/:userId] 유저 그토 닉네임 변경 가능 여부 조회');
  });
});

router.get('/profile/:writerId/gtnickname/:currentPage', (req, res) => {
  let { index } = req.query;
  index = (index === 1) ? 0 : (index - 1) * 5;

  Database.execute(
    (database) => database.query(
      GET_USER_GT_NICKNAME_HISTORY,
      {
        USER_ID: req.params.writerId,
        INDEX: index,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '유저 그토 닉네임 변경 이력 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/profile/gtnickname] 유저 그토 닉네임 변경 이력 조회');
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
          success: true,
          code: 1,
          message: '유저 작성 글 조회',
          result: rows,
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
          success: true,
          code: 1,
          message: '유저 작성 댓글 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/profile/comment] 유저 작성 댓글 조회');
  });
});

module.exports = router;
