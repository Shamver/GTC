const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_USER_IGNORE_LIST = `
  SELECT
  GUI.FROM_ID AS f_id
  , GUI.TARGET_ID AS t_id
  , date_format(GUI.DATE, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date
  , GU.NICKNAME AS nickname
  FROM GTC_USER_IGNORE GUI
  LEFT JOIN GTC_USER GU
  ON GUI.TARGET_ID = GU.ID
  WHERE GUI.FROM_ID = :USER_ID
`;

const INSERT_USER_IGNORE = `
  INSERT INTO GTC_USER_IGNORE
  VALUES(
    :FROM_ID
    , :TARGET_ID
    , sysdate()
    )
`;

const SELECT_USER_IGNORE = `
  SELECT *
  FROM GTC_USER_IGNORE
  WHERE TARGET_ID = :TARGET_ID AND FROM_ID = :FROM_ID
`;

const DELETE_USER_IGNORE = `
  DELETE FROM GTC_USER_IGNORE
  WHERE
  (FROM_ID, TARGET_ID) IN (
  SELECT FROM_ID, TARGET_ID from (
  SELECT FROM_ID, TARGET_ID FROM GTC_USER_IGNORE
  WHERE
  :SUB_QUERY) as sub
  );
`;

router.get('/', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_USER_IGNORE_LIST,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        if (rows.length >= 1) {
          let i = 0;
          const returnRows = rows.map((v) => {
            i += 1;
            return {
              ...v,
              id: i,
            };
          });
          res.send(returnRows);
        } else {
          res.send(rows);
        }
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/user/ignore] 유저 차단 목록 조회');
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
  const data = req.body;
  const { targetId, fromId } = data;

  Database.execute(
    (database) => database.query(
      SELECT_USER_IGNORE,
      {
        TARGET_ID: targetId,
        FROM_ID: fromId,
      },
    )
      .then((rows) => {
        if (rows.length >= 1) {
          res.send({
            SUCCESS: true,
            CODE: 2,
            MESSAGE: '😓 이미 차단한 유저입니다ㅠ',
          });
          throw new Error('이미 차단한 유저입니다.');
        } else {
          return database.query(
            INSERT_USER_IGNORE,
            {
              TARGET_ID: targetId,
              FROM_ID: fromId,
            },
          );
        }
      })
      .then(() => {
        res.send({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '✔ 성공적으로 차단되었습니다!',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/user/ignore] 유저 차단 추가');
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
    list,
  } = data;
  let subQuery = '';

  for (let i = 0; i < list.length; i += 1) {
    subQuery += `(FROM_ID=${list[i].f_id} AND TARGET_ID=${list[i].t_id})`;
    if (i !== list.length - 1) subQuery += ' OR ';
  }

  Database.execute(
    (database) => database.query(
      DELETE_USER_IGNORE,
      {
        SUB_QUERY: subQuery,
      },
    )
      .then(() => {
        res.send({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '✔ 성공적으로 삭제되었습니다!',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[DELETE, DELETE /api/user/ignore] 유저 차단 삭제');
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
