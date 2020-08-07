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
    BOARD
    , NAME
    , PATH
    , \`DESC\`
    , \`ORDER\`
    , USE_FL
    , PERMISSION_LEVEL
    , CRT_DTTM
   FROM GTC_BOARD
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
  Database.execute(
    (database) => database.query(
      SELECT_BOARD,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '게시판 조회 완료',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/system/board] 시스템 게시판 조회');
  });
});

module.exports = router;
