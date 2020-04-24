const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_USER_GET_MAIL_LIST = `
  SELECT 
    M.ID AS id
    , U.NICKNAME AS fromName
    , M.MESSAGE AS message
    , DATE_FORMAT(M.CRT_DTTM, '%Y-%m-%d %H:%i:%s') AS date
    , IFNULL(DATE_FORMAT(M.READ_DTTM, '%Y-%m-%d %H:%i:%s'), null) as readDate
  FROM 
    GTC_USER_MAIL M
    , GTC_USER U
  WHERE
    M.USER_ID_TARGET = :USER_ID 
    AND U.ID = M.USER_ID 
    AND M.DELETE_FL = 0
  ORDER BY M.CRT_DTTM DESC
`;

const SELECT_USER_SENT_MAIL_LIST = `
  SELECT
    M.ID AS id
    , U.NICKNAME AS targetName
    , M.MESSAGE AS message
    , DATE_FORMAT(M.CRT_DTTM, '%Y-%m-%d %H:%i:%s') AS date
    , IFNULL(DATE_FORMAT(M.READ_DTTM, '%Y-%m-%d %H:%i:%s'), NULL) AS readDate
  FROM 
    GTC_USER_MAIL M
    , GTC_USER U
  WHERE 
    M.USER_ID = :USER_ID 
    AND U.ID = M.USER_ID_TARGET 
    AND M.DELETE_FL = 0
  ORDER BY M.CRT_DTTM DESC
`;

const SELECT_USER_FROM_NICKNAME = `
  SELECT ID AS targetId
  FROM GTC_USER
  WHERE NICKNAME = ':NICKNAME'
`;

const INSERT_USER_MAIL = `
  INSERT INTO GTC_USER_MAIL (
    ID
    , USER_ID
    , USER_ID_TARGET
    , MESSAGE
    , CRT_DTTM
  ) VALUES (
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1, 1) FROM GTC_USER_MAIL) AS TEMP)
    , :USER_ID
    , :USER_ID_TARGET
    , ':MESSAGE'
    , SYSDATE()
  )
`;

const UPDATE_USER_MAIL_READ = `
  UPDATE GTC_USER_MAIL
  SET READ_DTTM = SYSDATE()
  WHERE 
    (USER_ID = :USER_ID 
      OR USER_ID_TARGET = :USER_ID) 
    AND ID = :MAIL_ID
`;

const UPDATE_USER_MAIL_DELETE = `
  UPDATE GTC_USER_MAIL
  SET DELETE_FL = 1
  WHERE 
    (USER_ID = :USER_ID 
      OR USER_ID_TARGET = :USER_ID) 
    AND ID = :MAIL_ID
`;

router.get('/get', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_USER_GET_MAIL_LIST,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '받은 쪽지 목록 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/mail/get] 받은 쪽지 목록 조회');
  });
});

router.get('/sent', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_USER_SENT_MAIL_LIST,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '보낸 쪽지 목록 조회',
          DATA: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/mail/sent] 보낸 쪽지 목록 조회');
  });
});

router.post('/', (req, res) => {
  const { fromId, targetName, message } = req.body;
  let code = 0;
  Database.execute(
    (database) => database.query(
      SELECT_USER_FROM_NICKNAME,
      {
        NICKNAME: targetName,
      },
    )
      .then((rows) => {
        if (rows.length >= 1) {
          const { targetId } = rows[0];
          if (fromId === targetId) {
            code = 2;
            return Promise.reject();
          }
          return database.query(
            INSERT_USER_MAIL,
            {
              USER_ID: fromId,
              USER_ID_TARGET: targetId,
              MESSAGE: message,
            },
          );
        }
        code = 3;
        return Promise.reject();
      })
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😊 쪽지가 전송되었습니다.',
        });
      }, () => {
        if (code === 2) {
          res.json({
            SUCCESS: true,
            CODE: 2,
            MESSAGE: '😓 본인에게는 쪽지를 보낼 수 없습니다!',
          });
        } else if (code === 3) {
          res.json({
            SUCCESS: true,
            CODE: 3,
            MESSAGE: '😓 존재하지 않는 닉네임입니다',
          });
        }
      }),
  ).then(() => {
    info('[INSERT, POST /api/user/mail] 쪽지 전송');
  });
});

router.put('/', (req, res) => {
  const data = req.body;
  const { userId, mailId } = data;

  Database.execute(
    (database) => database.query(
      UPDATE_USER_MAIL_READ,
      {
        USER_ID: userId,
        MAIL_ID: mailId,
      },
    )
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '쪽지 읽기 완료',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/user/mail] 쪽지 읽음 처리');
  });
});

router.delete('/', (req, res) => {
  const data = req.body;
  const {
    mailId, userId,
  } = data;

  Database.execute(
    (database) => database.query(
      UPDATE_USER_MAIL_DELETE,
      {
        USER_ID: userId,
        MAIL_ID: mailId,
      },
    )
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '🚮 쪽지가 삭제되었습니다.',
        });
      }),
  ).then(() => {
    info('[UPDATE, DELETE /api/user/mail] 쪽지 삭제');
  });
});

module.exports = router;
