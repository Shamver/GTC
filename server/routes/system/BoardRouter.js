const express = require('express');

const router = express.Router();
const { info } = require('../../log-config');
const Database = require('../../Database');

const INSERT_BOARD = `
  INSERT INTO GTC_BOARD (
      BOARD
      , NAME
      , PATH
      , \`DESC\`
      , \`ORDER\`
      , USE_FL
      , PERMISSION_LEVEL
  ) VALUES (
      ':BOARD'
      , ':NAME'
      , ':PATH'
      , ':DESC'
      , :ORDER
      , :USE_FL
      , :PERMISSION_LEVEL
  )
`;

const SELECT_BOARD = `
  SELECT
    GB.BOARD AS id
    , GB.NAME AS name
    , GB.PATH AS path
    , GB.\`DESC\` AS \`desc\`
    , GB.\`ORDER\` AS \`order\`
    , GB.USE_FL AS useFl
    , GB.PERMISSION_LEVEL AS permissionLevel
    , GB.CRT_DTTM AS crtDttm
   FROM GTC_BOARD GB
   WHERE GB.BOARD = ':BOARD'
`;

const SELECT_BOARD_ALL = `
  SELECT
    GB.BOARD AS board
    , GB.NAME AS name
    , GB.PATH AS path
    , GB.\`DESC\` as \`desc\`
    , GB.\`ORDER\` as \`order\`
    , (SELECT NAME FROM GTC_CODE WHERE CODEGROUP_ID = 'YN_FLAG' AND CODE = GB.USE_FL) AS useFl
    , GB.PERMISSION_LEVEL AS permissionLevel
    , GB.CRT_DTTM AS crtDttm
   FROM GTC_BOARD GB
`;

const UPDATE_BOARD = `
  UPDATE GTC_BOARD 
  SET 
    NAME = ':NAME'
    , PATH = ':PATH'
    , \`DESC\` = ':DESC'
    , \`ORDER\` = :ORDER
    , USE_FL = :USE_FL
    , PERMISSION_LEVEL = :PERMISSION_LEVEL
  WHERE BOARD = ':BOARD'
`;

router.post('/', (req, res) => {
  const {
    id, name, desc, path,
    order, useFl, permissionLevel,
  } = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_BOARD,
      {
        BOARD: id,
        NAME: name,
        DESC: desc,
        PATH: path,
        ORDER: order,
        USE_FL: useFl,
        PERMISSION_LEVEL: permissionLevel,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😳 게시판 추가 완료!',
        });
      }),
  ).then(() => {
    info('[INSERT, GET /api/system/board] 시스템 게시판 추가');
  });
});

router.get('/', (req, res) => {
  const { board } = req.query;
  Database.execute(
    (database) => database.query(
      SELECT_BOARD,
      {
        BOARD: board,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '게시판 조회 완료',
          result: rows[0],
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/system/board] 시스템 게시판 조회');
  });
});

router.get('/all', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_BOARD_ALL,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '게시판 전체 조회 완료',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/system/board] 시스템 게시판 전체 조회');
  });
});

router.put('/', (req, res) => {
  const {
    id, name, desc, path,
    order, useFl, permissionLevel,
  } = req.body;
  Database.execute(
    (database) => database.query(
      UPDATE_BOARD,
      {
        BOARD: id,
        NAME: name,
        DESC: desc,
        PATH: path,
        ORDER: order,
        USE_FL: useFl,
        PERMISSION_LEVEL: permissionLevel,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '😳 게시판이 수정되었습니다!',
          result: rows[0],
        });
      }),
  ).then(() => {
    info('[SELECT, PUT /api/system/board] 시스템 게시판 수정');
  });
});

module.exports = router;
