const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_USER_GET_MAIL_LIST = `
  SELECT 
  M.ID AS id
  , U.NICKNAME AS fromName
  , M.MESSAGE AS message
  , date_format(M.SENT_DATE, '%Y-%m-%d %H:%i:%s') AS date
  , IFNULL(date_format(M.READ_DATE, '%Y-%m-%d %H:%i:%s'), null) as readDate
  FROM GTC_USER_MAIL M, GTC_USER U
  WHERE M.TARGET_ID = :USER_ID AND U.ID = M.FROM_ID AND M.DELETE_YN = 'N'
`;

const SELECT_USER_SENT_MAIL_LIST = `
  SELECT
  M.ID AS id
  , U.NICKNAME AS targetName
  , M.MESSAGE AS message
  , date_format(M.SENT_DATE, '%Y-%m-%d %H:%i:%s') AS date
  , IFNULL(date_format(M.READ_DATE, '%Y-%m-%d %H:%i:%s'), null) as readDate
  FROM GTC_USER_MAIL M, GTC_USER U
  WHERE M.FROM_ID = :USER_ID AND U.ID = M.TARGET_ID AND M.DELETE_YN = 'N'
`;

const SELECT_USER_FROM_NICKNAME = `
  SELECT ID as targetId
  FROM GTC_USER
  WHERE NICKNAME = ':NICKNAME'
`;

const INSERT_USER_MAIL = `
  INSERT INTO GTC_USER_MAIL VALUES(
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_MAIL) as temp)
    , :FROM_ID
    , :TARGET_ID
    , ':MESSAGE'
    , sysdate()
    , null
    , 'N'
  )
`;

const UPDATE_USER_MAIL_READ = `
  UPDATE GTC_USER_MAIL
  SET READ_DATE = sysdate()
  WHERE (FROM_ID = :USER_ID OR TARGET_ID = :USER_ID) AND ID = :MAIL_ID
`;

const UPDATE_USER_MAIL_DELETE = `
  UPDATE GTC_USER_MAIL
  SET DELETE_YN = 'Y'
  WHERE (FROM_ID = :USER_ID OR TARGET_ID = :USER_ID) AND ID = :MAIL_ID
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
        res.send(rows.reverse());
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Get MailList Success');
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
        res.send(rows.reverse());
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Get SentMailList Success');
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

router.post('/', (req, res) => {
  const { fromId, targetName, message } = req.body;

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
            res.send({
              SUCCESS: false,
              MESSAGE: '😓 본인에게는 쪽지를 보낼 수 없습니다!',
            });
            throw new Error('본인에게는 쪽지를 보낼 수 없습니다.');
          } else {
            return database.query(
              INSERT_USER_MAIL,
              {
                FROM_ID: fromId,
                TARGET_ID: targetId,
                MESSAGE: message,
              },
            );
          }
        } else {
          res.send({
            SUCCESS: false,
            MESSAGE: '😓 존재하지 않는 닉네임입니다ㅠ',
          });
          throw new Error('존재하지 않는 닉네임입니다.');
        }
      })
      .then(() => {
        res.send({
          SUCCESS: true,
          MESSAGE: '✔ 쪽지가 전송되었습니다.',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Get SentMailList Success');
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
        res.send(200);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Update MailRead Success');
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
        res.send(200);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('Update MailDelete Success');
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
