const express = require('express');

const router = express.Router();
const { info } = require('../../log-config');
const Database = require('../../Database');

const INSERT_MENU = `
  INSERT INTO GTC_MENU (
      ID,
      , NAME
      , PATH
      , \`DESC\`
      , \`ORDER\`
      , USE_FL
      , PERMISSION_LEVEL
      , ICON
  ) VALUES (
      ':MENU_ID'
      , ':NAME'
      , ':PATH'
      , ':DESC'
      , :ORDER
      , :USE_FL
      , :PERMISSION_LEVEL
      , ':ICON'
  )
`;

const SELECT_MENU = `
  SELECT
    GB.ID AS id
    , GB.NAME AS name
    , GB.PATH AS path
    , GB.\`DESC\` AS \`desc\`
    , GB.\`ORDER\` AS \`order\`
    , GB.ICON AS icon
    , GB.USE_FL AS useFl
    , GB.PERMISSION_LEVEL AS permissionLevel
    , GB.CRT_DTTM AS crtDttm
   FROM GTC_MENU GB
   WHERE GB.MENU = ':MENU_ID'
`;

const SELECT_BOARD_ALL = `
  SELECT
    GB.BOARD AS board
    , GB.NAME AS name
    , GB.PATH AS path
    , GB.\`DESC\` as \`desc\`
    , GB.\`ORDER\` as \`order\`
    , GB.ICON AS icon
    , (SELECT NAME FROM GTC_CODE WHERE CODEGROUP_ID = 'YN_FLAG' AND CODE = GB.USE_FL) AS useFl
    , GB.PERMISSION_LEVEL AS permissionLevel
    , GB.CRT_DTTM AS crtDttm
   FROM GTC_BOARD GB
   ORDER BY GB.\`ORDER\`
`;

const SELECT_BOARD_USE_FL_Y = `
  SELECT
    GB.BOARD AS board
    , GB.NAME AS name
    , GB.PATH AS path
    , GB.\`DESC\` as \`desc\`
    , GB.\`ORDER\` as \`order\`
    , GB.ICON AS icon
    , (SELECT NAME FROM GTC_CODE WHERE CODEGROUP_ID = 'YN_FLAG' AND CODE = GB.USE_FL) AS useFl
    , GB.PERMISSION_LEVEL AS permissionLevel
    , GB.CRT_DTTM AS crtDttm
   FROM GTC_BOARD GB
   WHERE GB.USE_FL = 1
   ORDER BY GB.\`ORDER\`
`;

const UPDATE_BOARD = `
  UPDATE GTC_BOARD 
  SET 
    NAME = ':NAME'
    , PATH = ':PATH'
    , \`DESC\` = ':DESC'
    , \`ORDER\` = :ORDER
    , USE_FL = :USE_FL
    , ICON = ':ICON'
    , PERMISSION_LEVEL = :PERMISSION_LEVEL
  WHERE BOARD = ':BOARD'
`;

const DELETE_BOARD = `
  DELETE FROM GTC_BOARD 
  WHERE BOARD = ':BOARD'
`;

const INSERT_BOARD_CATEGORY = `
  INSERT INTO GTC_BOARD_CATEGORY (
      BOARD
      , CATEGORY
      , NAME
      , PATH
      , \`DESC\`
      , \`ORDER\`
      , USE_FL
  ) VALUES (
      ':BOARD'
      , ':CATEGORY'
      , ':NAME'
      , ':PATH'
      , ':DESC'
      , :ORDER
      , :USE_FL
  )
`;


const SELECT_BOARD_CATEGORY = `
  SELECT
    GBC.BOARD AS board
    , GBC.CATEGORY AS id
    , GBC.NAME AS name
    , GBC.PATH AS path
    , GBC.\`DESC\` as \`desc\`
    , GBC.\`ORDER\` as \`order\`
    , GBC.USE_FL AS useFl
    , GBC.CRT_DTTM AS crtDttm
   FROM GTC_BOARD_CATEGORY GBC
   WHERE 
    GBC.BOARD = ':BOARD'
    AND GBC.CATEGORY = ':CATEGORY'
   ORDER BY GBC.\`ORDER\`
`;


const SELECT_BOARD_CATEGORY_ALL = `
  SELECT
    GBC.BOARD AS board
    , GBC.CATEGORY AS id
    , GBC.NAME AS name
    , GBC.PATH AS path
    , GBC.\`DESC\` as \`desc\`
    , GBC.\`ORDER\` as \`order\`
    , (SELECT NAME FROM GTC_CODE WHERE CODEGROUP_ID = 'YN_FLAG' AND CODE = GBC.USE_FL) AS useFl
    , GBC.CRT_DTTM AS crtDttm
   FROM GTC_BOARD_CATEGORY GBC
   WHERE GBC.BOARD = ':BOARD'
   ORDER BY GBC.\`ORDER\`
`;

const UPDATE_BOARD_CATEGORY = `
  UPDATE GTC_BOARD_CATEGORY 
  SET 
    NAME = ':NAME'
    , PATH = ':PATH'
    , \`DESC\` = ':DESC'
    , \`ORDER\` = :ORDER
    , USE_FL = :USE_FL
  WHERE
    BOARD = ':BOARD'
    AND CATEGORY = ':CATEGORY'
`;

const DELETE_BOARD_CATEGORY = `
  DELETE FROM GTC_BOARD_CATEGORY
  WHERE 
    BOARD = ':BOARD'
    AND CATEGORY = ':CATEGORY'
`;

router.post('/', (req, res) => {
  const {
    id, name, desc, path, icon,
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
        ICON: icon,
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
    info('[INSERT, POST /api/system/board] 시스템 게시판 추가');
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
    info('[SELECT, GET /api/system/board/all] 시스템 게시판 전체 조회');
  });
});

router.get('/use', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_BOARD_USE_FL_Y,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '게시판 사용 조회 완료',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/system/board/use] 시스템 게시판 사용 조회');
  });
});

router.put('/', (req, res) => {
  const {
    id, name, desc, path, icon,
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
        ICON: icon,
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
    info('[UPDATE, PUT /api/system/board] 시스템 게시판 수정');
  });
});

router.delete('/', (req, res) => {
  const { board } = req.query;
  Database.execute(
    (database) => database.query(
      DELETE_BOARD,
      {
        BOARD: board,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '😳 게시판이 삭제되었습니다!',
          result: rows[0],
        });
      }),
  ).then(() => {
    info('[DELETE, DELETE /api/system/board] 시스템 게시판 삭제');
  });
});

router.post('/category', (req, res) => {
  const {
    id, board, name, desc, path,
    order, useFl,
  } = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_BOARD_CATEGORY,
      {
        CATEGORY: id,
        BOARD: board,
        NAME: name,
        DESC: desc,
        PATH: path,
        ORDER: order,
        USE_FL: useFl,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😳 게시판 카테고리 추가 완료!',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/system/board/category] 시스템 게시판 카테고리 추가');
  });
});

router.get('/category', (req, res) => {
  const { board, category } = req.query;
  Database.execute(
    (database) => database.query(
      SELECT_BOARD_CATEGORY,
      {
        BOARD: board,
        CATEGORY: category,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '게시판 카테고리 조회 완료',
          result: rows[0],
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/system/board/category] 시스템 게시판 카테고리 조회');
  });
});

router.get('/category/all', (req, res) => {
  const { board } = req.query;
  Database.execute(
    (database) => database.query(
      SELECT_BOARD_CATEGORY_ALL,
      {
        BOARD: board,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '게시판 카테고리 전체 조회 완료',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/system/board/category/all] 게시판 카테고리 전체 조회 완료');
  });
});

router.put('/category', (req, res) => {
  const {
    board, id, name, desc, path,
    order, useFl,
  } = req.body;
  Database.execute(
    (database) => database.query(
      UPDATE_BOARD_CATEGORY,
      {
        BOARD: board,
        CATEGORY: id,
        NAME: name,
        DESC: desc,
        PATH: path,
        ORDER: order,
        USE_FL: useFl,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '😳 카테고리가 수정되었습니다!',
          result: rows[0],
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/system/board/category] 시스템 게시판 카테고리 수정');
  });
});

router.delete('/category', (req, res) => {
  const { board, category } = req.query;
  Database.execute(
    (database) => database.query(
      DELETE_BOARD_CATEGORY,
      {
        BOARD: board,
        CATEGORY: category,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '😳 카테고리가 삭제되었습니다!',
          result: rows[0],
        });
      }),
  ).then(() => {
    info('[DELETE, DELETE /api/system/board/category] 시스템 게시판 카테고리 삭제');
  });
});

module.exports = router;
