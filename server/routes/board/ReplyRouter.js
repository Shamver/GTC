const express = require('express');

const router = express.Router();

const alertMiddleware = require('../../middleware/alert');
const authMiddleware = require('../../middleware/auth');

const point = require('../../middleware/point');
const Database = require('../../Database');
const { info } = require('../../log-config');

const SELECT_COMMENT_REPLY_CHECK = `
  SELECT COUNT(*) AS count FROM GTC_COMMENT
  WHERE (COMMENT_ID = :COMMENT_ID AND ID <> :COMMENT_ID)
  AND DELETE_FL = 0
`;

const UPDATE_COMMENT_DELETE = `
  UPDATE GTC_COMMENT
    SET DELETE_FL = 1
  WHERE ID = :COMMENT_ID
`;

const SELECT_LAST_INSERT_ID = `
  SELECT
    LAST_INSERT_ID() AS ID
`;

const INSERT_COMMENT = `
  INSERT INTO GTC_COMMENT (
    POST_ID
    , COMMENT_ID
    , COMMENT_ID_UPPER
    , USER_ID
    , CONTENT
    , SECRET_FL
    , CRT_DTTM
  ) VALUES (
    :POST_ID
    , IFNULL(
        :COMMENT_ID
        , (SELECT ID FROM (SELECT IFNULL(MAX(ID)+1, 1) AS ID FROM GTC_COMMENT) as temp)
      )
    , IFNULL(
        (SELECT COMMENT_ID_UPPER FROM (SELECT MIN(COMMENT_ID_UPPER) AS COMMENT_ID_UPPER FROM GTC_COMMENT WHERE ID = :COMMENT_ID) as temp)
        , (SELECT ID FROM (SELECT IFNULL(MAX(ID)+1,1) AS ID FROM GTC_COMMENT) as temp)
      )
    , :USER_ID 
    , ':CONTENT'
    , :SECRET_FL
    , SYSDATE()
  );
`;

const SELECT_COMMENT_POST_WRITER_COMMENT_ID = `
  SELECT 
    GP.USER_ID as postWriter,
    IFNULL(MAX(GC.ID),1) AS commentId
  FROM GTC_POST GP, GTC_COMMENT GC
  WHERE GP.ID = :POST_ID
`;

const SELECT_POST_COMMENT = `
  SELECT 
    A.ID AS id
    , A.COMMENT_ID AS commentId
    , A.COMMENT_ID_UPPER AS commentIdUpper
    , C.USER_ID AS idPostWriter
    , A.USER_ID AS idWriter
    , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = A.USER_ID) AS writer
    , CASE WHEN A.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇 초 전'
        WHEN A.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, A.CRT_DTTM, SYSDATE()),'분 전')
        WHEN A.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, A.CRT_DTTM, SYSDATE()),'시간 전')
        WHEN A.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY, A.CRT_DTTM, SYSDATE()),'일 전')
        WHEN A.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH, A.CRT_DTTM, SYSDATE()),'달 전')
       ELSE CONCAT(TIMESTAMPDIFF(YEAR, A.CRT_DTTM, SYSDATE()),'년 전')
    END AS date
    , CASE
            WHEN A.MFY_DTTM IS NULL THEN NULL 
            WHEN A.MFY_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇 초 전 수정'
            WHEN A.MFY_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, A.MFY_DTTM, SYSDATE()),'분 전 수정')
            WHEN A.MFY_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, A.MFY_DTTM, SYSDATE()),'시간 전 수정')
            WHEN A.MFY_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY, A.MFY_DTTM, SYSDATE()),'일 전 수정')
            WHEN A.MFY_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH, A.MFY_DTTM, SYSDATE()),'달 전 수정')
           ELSE CONCAT(TIMESTAMPDIFF(YEAR, A.MFY_DTTM, SYSDATE()),'년 전')
       END  AS updateDate
    , (
        SELECT
          CASE WHEN DELETE_FL = 1 THEN 'DELETED'
            WHEN IF(A.ID = COMMENT_ID_UPPER, 0, 1) = 1 THEN  (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = USER_ID)
          END
        FROM GTC_COMMENT
        WHERE ID = A.COMMENT_ID
      ) AS commentReplyName
    , A.CONTENT AS content
    , A.SECRET_FL AS secretFl
    , A.DELETE_FL AS deleteFl
    , IF(A.ID = COMMENT_ID_UPPER, 0, 1) AS tabFl
    , (SELECT COUNT(*) FROM GTC_COMMENT_LIKE WHERE COMMENT_ID = A.ID) AS likeCount
    FROM GTC_COMMENT A, GTC_POST C
  WHERE 
    A.POST_ID = :POST_ID 
    AND A.USER_ID NOT IN 
    (SELECT USER_ID_TARGET FROM GTC_USER_IGNORE WHERE USER_ID = :USER_ID)
  AND A.DELETE_FL = 0
  AND C.ID = A.POST_ID
  ORDER BY A.COMMENT_ID_UPPER, A.ID
`;

const SELECT_MY_POST = `
  SELECT 
    GBP.ID AS postId
    , GBP.TITLE AS postTitle
    , GBR.ID AS replyId
    , GBR.CONTENT AS replyContent
    , DATE_FORMAT(GBR.CRT_DTTM, '%Y-%m-%d %H:%i:%s') AS replyDate
  FROM 
    GTC_POST GBP 
    LEFT JOIN GTC_COMMENT GBR
    ON GBP.ID = GBR.POST_ID
  WHERE GBR.USER_ID = :USER_ID
  ORDER BY GBR.CRT_DTTM DESC
`;

const SELECT_COMMENT_LIKE_DUPLICATE_CHECK = `
  SELECT 
    COUNT(*) AS count 
  FROM GTC_COMMENT_LIKE
  WHERE 
    COMMENT_ID = :COMMENT_ID
    AND USER_ID = :USER_ID
`;

const INSERT_COMMENT_LIKE = `
  INSERT INTO GTC_COMMENT_LIKE (
    COMMENT_ID
    , USER_ID
  ) VALUES (
    :COMMENT_ID
    , :USER_ID
  )
`;

const UPDATE_COMMENT = `
  UPDATE GTC_COMMENT
  SET 
    CONTENT = ':CONTENT'
    , MFY_DTTM = SYSDATE()
  WHERE ID = :COMMENT_ID
`;

router.post('/', authMiddleware, (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_COMMENT,
      {
        POST_ID: data.bpId,
        COMMENT_ID: data.replyId,
        USER_ID: data.writer,
        CONTENT: data.text,
        SECRET_FL: data.secretYN,
      },
    )
      .then(() => database.query(
        SELECT_COMMENT_POST_WRITER_COMMENT_ID,
        {
          POST_ID: data.bpId,
        },
      ))
      .then((rows) => {
        const { postWriter } = rows[0];

        if (postWriter !== data.writer) {
          return database.query(
            SELECT_LAST_INSERT_ID,
            {},
          );
        }
        // 본인 게시물의 댓글일 경우 다음 분기 다르게 하기
        return Promise.reject();
      })
      .then((rows) => {
        const { ID } = rows[0];
        point('addReply', 'REPLY', { ...data, replyId: rows[0].replyId });
        return alertMiddleware(database, ID);
      }, () => {})
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😊 댓글이 정상적으로 등록되었어요!',
        });
      })
      .catch((err) => {
        console.log(err);
      }),
  ).then(() => {
    info('[INSERT, POST /api/board/reply] 댓글 등록 완료');
  });
});

router.get('/', (req, res) => {
  const data = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_POST_COMMENT,
      {
        POST_ID: data.bpId,
        USER_ID: data.userId ? data.userId : null,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '댓글 목록 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/reply] 댓글 목록 조회');
  });
});

router.put('/', authMiddleware, (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_COMMENT,
      {
        COMMENT_ID: data.id,
        CONTENT: data.content,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😊 댓글이 수정되었어요!',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/board/post] 댓글 수정');
  });
});

router.delete('/', authMiddleware, (req, res) => {
  const data = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_COMMENT_REPLY_CHECK,
      {
        COMMENT_ID: data.replyId,
      },
    )
      .then((rows) => {
        if (rows[0].count >= 1) {
          return Promise.reject();
        }

        return database.query(
          UPDATE_COMMENT_DELETE,
          {
            COMMENT_ID: data.replyId,
          },
        );
      })
      .then(() => {
        point('deleteReply', 'REPLY', data);
        res.json({
          success: true,
          code: 1,
          message: '😊 댓글이 삭제되었어요!',
        });
      }, () => {
        res.json({
          success: true,
          code: 2,
          message: '😳 해당 댓글에 답글이 달려있어 삭제하지 못합니다.',
        });
      }),
  ).then(() => {
    info('[DELETE, DELETE /api/board/reply] 댓글 삭제');
  });
});

// 댓글 좋아요
router.post('/like', authMiddleware, (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_COMMENT_LIKE_DUPLICATE_CHECK,
      {
        COMMENT_ID: data.id,
        USER_ID: data.uId,
      },
    )
      .then((rows) => {
        if (rows[0].count === 1) {
          return Promise.reject();
        }

        return database.query(
          INSERT_COMMENT_LIKE,
          {
            COMMENT_ID: data.id,
            USER_ID: data.uId,
          },
        );
      })
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😊 해당 댓글 좋아요 완료!',
        });
      }, () => {
        res.json({
          success: true,
          code: 2,
          message: '😳 이미 해당 댓글을 좋아요를 누르셨습니다.',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/board/reply/like] 댓글 좋아요');
  });
});

// 줄 길어지는거나 도배한거 어떻게 하냐.. 처리해야함.
router.get('/mine', authMiddleware, (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_MY_POST,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '내가 쓴 댓글 목록 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/reply/mine] 내가 쓴 댓글 목록 조회');
  });
});


module.exports = router;
