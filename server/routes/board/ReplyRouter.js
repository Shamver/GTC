const express = require('express');

const router = express.Router();

const alertMiddleware = require('../../middleware/alert');

const point = require('../../middleware/point');
const Database = require('../../Database');

const { info, error } = require('../../log-config');

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
    ID
    , POST_ID
    , COMMENT_ID
    , COMMENT_ID_UPPER
    , USER_ID
    , CONTENT
    , SECRET_FL
    , CRT_DTTM
  ) VALUES (
    (SELECT ID FROM (SELECT IFNULL(MAX(ID)+1,1) AS ID FROM GTC_COMMENT) as temp)
    , :POST_ID
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


const SELECT_BOARD_POST_REPLY = `
  SELECT 
    A.ID AS id
    , A.ID_REPLY AS idReply
    , A.ID_UPPER AS idUpper
    , C.WRITER AS idPostWriter
    , A.WRITER AS idWriter
    , (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = A.WRITER) AS writer
    , CASE WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇 초 전'
        WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE,A.DATE, SYSDATE()),'분 전')
        WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR,A.DATE, SYSDATE()),'시간 전')
        WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY,A.DATE, SYSDATE()),'일 전')
        WHEN A.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH,A.DATE, SYSDATE()),'달 전')
       ELSE CONCAT(TIMESTAMPDIFF(YEAR,A.DATE, SYSDATE()),'년 전')
    END  as date
    , CASE
            WHEN A.UPDATE_DATE IS NULL THEN NULL 
            WHEN A.UPDATE_DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇 초 전 수정'
            WHEN A.UPDATE_DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE,A.UPDATE_DATE, SYSDATE()),'분 전 수정')
            WHEN A.UPDATE_DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR,A.UPDATE_DATE, SYSDATE()),'시간 전 수정')
            WHEN A.UPDATE_DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY,A.UPDATE_DATE, SYSDATE()),'일 전 수정')
            WHEN A.UPDATE_DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH,A.UPDATE_DATE, SYSDATE()),'달 전 수정')
           ELSE CONCAT(TIMESTAMPDIFF(YEAR, A.UPDATE_DATE, SYSDATE()),'년 전')
       END  as updateDate
    , ( 
        SELECT 
                CASE WHEN DELETE_YN = 'Y' THEN 'DELETED'
                        WHEN DEPTH = 2 THEN  (SELECT U.NICKNAME FROM GTC_USER U WHERE U.ID = WRITER) 
                END 
        FROM GTC_BOARD_REPLY
        WHERE ID = A.ID_REPLY
    ) AS replyWriterName
    , A.CONTENT as content
    , A.DEPTH as depth
    , A.SECRET_YN as secretYN
    , A.DELETE_YN as deleteYN
    , (SELECT COUNT(*) FROM GTC_BOARD_REPLY_LIKE WHERE ID = A.ID) AS likeCount
    FROM GTC_BOARD_REPLY A, GTC_BOARD_POST C
  WHERE A.BP_ID = ':BP_ID' AND A.WRITER != IFNULL(( SELECT TARGET_ID FROM GTC_USER_IGNORE WHERE FROM_ID = :USER_ID), -1)
  AND A.DELETE_YN = 'N'
  AND C.ID = A.BP_ID
  ORDER BY A.ID_UPPER, A.ID
`;

const SELECT_BOARD_POST_MINE = `
  SELECT 
    GBP.ID AS postId
    , GBP.TITLE AS postTitle
    , GBR.ID AS replyId
    , GBR.CONTENT AS replyContent
    , date_format(GBR.DATE, '%Y-%m-%d %H:%i:%s') AS replyDate
  FROM GTC_BOARD_POST GBP LEFT JOIN GTC_BOARD_REPLY GBR
  ON GBP.ID = GBR.BP_ID
  WHERE GBR.WRITER = :USER_ID
  ORDER BY GBR.DATE DESC
`;

const SELECT_BOARD_REPLY_LIKE_DUPLICATE_CHECK = `
  SELECT COUNT(*) AS count FROM GTC_BOARD_REPLY_LIKE
    WHERE ID = :ID
    AND U_ID = :U_ID
`;

const INSERT_BOARD_REPLY_LIKE = `
  INSERT INTO GTC_BOARD_REPLY_LIKE
  VALUES (
    :ID,
    :U_ID
  )
`;

const UPDATE_BOARD_REPLY = `
  UPDATE GTC_BOARD_REPLY
  SET 
    CONTENT = ':CONTENT',
    UPDATE_DATE = sysdate()
  WHERE ID = :ID
`;

router.post('/', (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_COMMENT,
      {
        BP_ID: data.bpId,
        REPLY_ID: data.replyId,
        WRITER: data.writer,
        TEXT: data.text,
        DEPTH: data.depth,
        SECRET_YN: data.secretYN,
      },
    )
      .then(() => database.query(
        SELECT_COMMENT_POST_WRITER_REPLY_ID,
        {
          BP_ID: data.bpId,
        },
      ))
      .then((rows) => {
        point('addReply', 'REPLY', { ...data, replyId: rows[0].replyId });

        const { postWriter } = rows[0];
        if (postWriter !== data.writer) {
          return database.query(
            SELECT_LAST_INSERT_ID,
            {},
          );
        }

        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😊 댓글이 정상적으로 등록되었어요!',
        });
        throw new Error('댓글 작성 완료');
      })
      .then((rows) => {
        const { ID } = rows[0];
        return alertMiddleware(database, ID);
      })
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😊 댓글이 정상적으로 등록되었어요!',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/board/reply] 댓글 등록 완료');
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

router.get('/', (req, res) => {
  const data = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_BOARD_POST_REPLY,
      {
        BP_ID: data.bpId,
        USER_ID: data.userId,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '댓글 목록 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/board/reply] 댓글 목록 조회');
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

router.put('/', (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_BOARD_REPLY,
      {
        ID: data.id,
        CONTENT: data.content,
      },
    )
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😊 댓글이 수정되었어요!',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[UPDATE, PUT /api/board/post] 댓글 수정');
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

router.delete('/', (req, res) => {
  const data = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_COMMENT_REPLY_CHECK,
      {
        REPLY_ID: data.replyId,
      },
    )
      .then((rows) => {
        if (rows[0].count >= 1) {
          res.json({
            SUCCESS: true,
            CODE: 2,
            MESSAGE: '😳 해당 댓글에 답글이 달려있어 삭제하지 못해요!',
          });
          throw new Error('해당 댓글에 답글이 달려있기 때문에 삭제할 수 없습니다.');
        }

        return database.query(
          UPDATE_COMMENT_DELETE,
          {
            REPLY_ID: data.replyId,
          },
        );
      })
      .then(() => {
        point('deleteReply', 'REPLY', data);
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😊 댓글이 삭제되었어요!',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[DELETE, DELETE /api/board/reply] 댓글 삭제');
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

// 댓글 좋아요
router.post('/like', (req, res) => {
  const data = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_BOARD_REPLY_LIKE_DUPLICATE_CHECK,
      {
        ID: data.id,
        U_ID: data.uId,
      },
    )
      .then((rows) => {
        if (rows[0].count === 1) {
          res.json({
            SUCCESS: true,
            CODE: 2,
            MESSAGE: '😳 이미 해당 댓글을 좋아합니다. ㅠㅠ',
          });
          throw new Error('이미 해당 댓글에 좋아요를 눌렀습니다.');
        } else {
          return database.query(
            INSERT_BOARD_REPLY_LIKE,
            {
              ID: data.id,
              U_ID: data.uId,
            },
          );
        }
      })
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😊 해당 댓글 좋아요 완료!',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/board/reply/like] 댓글 좋아요');
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

// 줄 길어지는거나 도배한거 어떻게 하냐.. 처리해야함.
router.get('/mine', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_BOARD_POST_MINE,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '내가 쓴 댓글 목록 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/board/reply/mine] 내가 쓴 댓글 목록 조회');
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
