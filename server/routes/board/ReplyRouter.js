const express = require('express');

const router = express.Router();

const db = require('../../dbConnection')();

const alertMiddleware = require('../../middleware/alert');

const conn = db.init();

const point = require('../../middleware/point');
const Database = require('../../Database');

const { info, error } = require('../../log-config');

const SELECT_BOARD_REPLY_RE_CHECK = `
  SELECT COUNT(*) AS count FROM GTC_BOARD_REPLY
  WHERE (ID_REPLY = :REPLY_ID AND ID <> :REPLY_ID)
  AND DELETE_YN = 'N'
`;

const UPDATE_BOARD_REPLY_DELETE = `
  UPDATE GTC_BOARD_REPLY
    SET DELETE_YN = 'Y'
  WHERE ID = :REPLY_ID
`;

const INSERT_BOARD_REPLY = `
  INSERT INTO GTC_BOARD_REPLY (
    ID,
    BP_ID,
    ID_REPLY,
    ID_UPPER,
    WRITER,
    DATE,
    UPDATE_DATE,
    CONTENT,
    DEPTH,
    SECRET_YN,
    DELETE_YN
  ) VALUES (
    (SELECT ID FROM (SELECT IFNULL(MAX(ID)+1,1) AS ID FROM GTC_BOARD_REPLY) as temp),
    :BP_ID,
    IFNULL(:REPLY_ID, (SELECT ID FROM (SELECT IFNULL(MAX(ID)+1,1) AS ID FROM GTC_BOARD_REPLY) as temp)),
    IFNULL((SELECT ID_UPPER FROM (SELECT MIN(ID_UPPER) AS ID_UPPER FROM GTC_BOARD_REPLY WHERE ID = :REPLY_ID) as temp),(SELECT ID FROM (SELECT IFNULL(MAX(ID)+1,1) AS ID FROM GTC_BOARD_REPLY) as temp)),
    ':WRITER', 
    sysdate(),
    null, 
    ':TEXT',
    :DEPTH,
    ':SECRET_YN',
    'N'
  );
`;

const SELECT_BOARD_REPLY_POST_WRITER_REPLY_ID = `
  SELECT 
    GBP.WRITER as postWriter,
    IFNULL(MAX(GBR.ID),1) AS replyId
  FROM GTC_BOARD_POST GBP, GTC_BOARD_REPLY GBR
  WHERE GBP.ID = :BP_ID
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
  WHERE A.BP_ID = ':BP_ID'
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
      INSERT_BOARD_REPLY,
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
        SELECT_BOARD_REPLY_POST_WRITER_REPLY_ID,
        {
          BP_ID: data.bpId,
        },
      ))
      .then((rows) => {
        const { postWriter } = rows[0];
        if (postWriter !== data.writer) {
          alertMiddleware();
        }

        point('addReply', 'REPLY', { ...data, replyId: rows[0].replyId });
        res.send(true);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Add Reply Success');
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
      },
    )
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Get Reply Success');
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
        res.send(true);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Modify Reply Success');
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
      SELECT_BOARD_REPLY_RE_CHECK,
      {
        REPLY_ID: data.replyId,
      },
    )
      .then((rows) => {
        if (rows[0].count >= 1) {
          res.send(2);
          throw new Error('해당 댓글에 답글이 달려있기 때문에 삭제할 수 없습니다.');
        }

        return database.query(
          UPDATE_BOARD_REPLY_DELETE,
          {
            REPLY_ID: data.replyId,
          },
        );
      })
      .then(() => {
        point('deleteReply', 'REPLY', data);
        res.send(1);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Delete Reply Success');
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
          res.send(2);
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
        res.send(1);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Add Reply Like Success');
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
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Get Mine Reply Success');
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
