const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_USER_IGNORE_LIST = `
  SELECT
    GUI.USER_ID AS f_id
    , GUI.USER_ID_TARGET AS t_id
    , DATE_FORMAT(GUI.CRT_DTTM, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date
    , GU.NICKNAME AS nickname
  FROM
    GTC_USER_IGNORE GUI
    LEFT JOIN GTC_USER GU
    ON GUI.USER_ID_TARGET = GU.ID
  WHERE GUI.USER_ID = :USER_ID
`;

const INSERT_USER_IGNORE = `
  INSERT INTO GTC_USER_IGNORE (
    USER_ID
    , USER_ID_TARGET
    , CRT_DTTM
  ) VALUES (
    :USER_ID
    , :USER_ID_TARGET
    , SYSDATE()
  )
`;

const SELECT_USER_IGNORE = `
  SELECT 
    *
  FROM GTC_USER_IGNORE
  WHERE 
    USER_ID_TARGET = :USER_ID_TARGET
    AND USER_ID = :USER_ID
`;

const DELETE_USER_IGNORE = `
  DELETE FROM GTC_USER_IGNORE
  WHERE (USER_ID, USER_ID_TARGET) IN (
    SELECT 
      USER_ID 
      USER_ID_TARGET 
    FROM (
      SELECT 
        USER_ID
        , USER_ID_TARGET 
      FROM GTC_USER_IGNORE
      WHERE :SUB_QUERY
    ) AS sub
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
          res.json({
            SUCCESS: true,
            CODE: 1,
            MESSAGE: '차단 목록 조회',
            DATA: returnRows,
          });
        } else {
          res.json({
            SUCCESS: true,
            CODE: 1,
            MESSAGE: '차단 목록 조회',
            DATA: rows,
          });
        }
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/ignore] 유저 차단 목록 조회');
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
          res.json({
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
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '✔ 성공적으로 차단되었습니다!',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/user/ignore] 유저 차단 추가');
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
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '✔ 성공적으로 삭제되었습니다!',
        });
      }),
  ).then(() => {
    info('[DELETE, DELETE /api/user/ignore] 유저 차단 삭제');
  });
});

module.exports = router;
