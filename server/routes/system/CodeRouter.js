const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_CODEGROUP = `
  SELECT
    ID AS groupId
    , NAME AS groupName
    , \`DESC\` AS groupDesc
  FROM GTC_CODEGROUP
`;

const INSERT_CODEGROUP = `
  INSERT INTO GTC_CODEGROUP (
    ID
    , NAME
    , \`DESC\`
    , CRT_DTTM
  ) VALUES (
    ':CODEGROUP_ID'
    , ':NAME'
    , ':DESC'
    , SYSDATE()
  )
`;

const UPDATE_CODEGROUP = `
  UPDATE GTC_CODEGROUP
  SET  
    NAME = ':NAME'
    , \`DESC\` = ':DESC'
  WHERE ID = ':CODEGROUP_ID'
`;

const DELETE_CODEGROUP = `
  DELETE FROM GTC_CODEGROUP
  WHERE ID = ':CODEGROUP_ID'
`;

const INSERT_CODE = `
  INSERT INTO GTC_CODE (
    CODEGROUP_ID
    , CODE
    , NAME
    , \`DESC\`
    , \`ORDER\`
    , USE_FL
    , CRT_DTTM
  ) VALUES (
    ':CODEGROUP_ID'
    , ':CODE'
    , ':NAME'
    , ':DESC'
    , :ORDER
    , :USE_FL
    , SYSDATE()
  )
`;

const SELECT_CODE = `
  SELECT
    CODEGROUP_ID AS codeGroup
    , CODE AS code
    , NAME AS codeName
    , \`DESC\` AS codeDesc
    , CAST(\`ORDER\` AS CHAR) AS codeOrder
    , USE_FL AS useYN
  FROM GTC_CODE
  WHERE CODEGROUP_ID = ':CODEGROUP_ID'
`;

const UPDATE_CODE = `
  UPDATE GTC_CODE
  SET  
    NAME = ':NAME'
    , \`DESC\` = ':DESC'
    , \`ORDER\` = :ORDER
    , USE_FL = :USE_FL
  WHERE 
    CODEGROUP_ID = ':CODEGROUP_ID'
    AND CODE = ':CODE'
`;

const DELETE_CODE = `
  DELETE FROM GTC_CODE
  WHERE 
    CODEGROUP_ID = ':CODEGROUP_ID'
    AND CODE = ':CODE'
`;

const SELECT_TEMP = `
  SELECT *
  FROM GTC_CODE
  WHERE CODEGROUP_ID = ':TMP'
`;


router.post('/group', (req, res) => {
  const { id, name, desc } = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_CODEGROUP,
      {
        CODEGROUP_ID: id,
        NAME: name,
        DESC: desc,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 0,
          message: '😳 코드 그룹 추가 완료!',
        });
      }),
  ).then(() => {
    info('[INSERT, GET /api/system/code/group] 시스템 코드그룹 추가');
  });
});

router.get('/group', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_CODEGROUP,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 0,
          message: '코드 그룹 조회 완료',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/system/code/group] 시스템 코드그룹 조회');
  });
});

router.put('/group', (req, res) => {
  const { id, name, desc } = req.body;
  Database.execute(
    (database) => database.query(
      UPDATE_CODEGROUP,
      {
        CODEGROUP_ID: id,
        NAME: name,
        DESC: desc,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 0,
          message: '😳 코드 그룹 수정 완료!',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/system/code/group] 시스템 코드그룹 수정');
  });
});

router.delete('/group', (req, res) => {
  const { group } = req.query;
  Database.execute(
    (database) => database.query(
      DELETE_CODEGROUP,
      {
        CODEGROUP_ID: group,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 0,
          message: '😳 코드 그룹 삭제 완료!',
        });
      }),
  ).then(() => {
    info('[DELETE, DELETE /api/system/code/group] 시스템 코드그룹 삭제');
  });
});

router.post('/', (req, res) => {
  const {
    id, group,
    name, desc, order, useYN,
  } = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_CODE,
      {
        CODE: id,
        CODEGROUP_ID: group,
        NAME: name,
        DESC: desc,
        ORDER: order,
        USE_FL: useYN,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 0,
          message: '😳 코드 추가 완료!',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/system/code] 시스템 코드 추가');
  });
});

router.get('/', (req, res) => {
  const { codeGroup } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_CODE,
      {
        CODEGROUP_ID: codeGroup,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 0,
          message: '코드 조회 완료',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/system/code] 시스템 코드 조회');
  });
});

router.put('/', (req, res) => {
  const {
    id, group, name, order,
    desc, useYN,
  } = req.body;
  Database.execute(
    (database) => database.query(
      UPDATE_CODE,
      {
        CODE: id,
        CODEGROUP_ID: group,
        NAME: name,
        ORDER: order,
        DESC: desc,
        USE_FL: useYN,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 0,
          message: '😳 코드 수정 완료!',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/system/code] 시스템 코드 수정');
  });
});

router.delete('/', (req, res) => {
  const { group, code } = req.query;
  Database.execute(
    (database) => database.query(
      DELETE_CODE,
      {
        CODEGROUP_ID: group,
        CODE: code,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 0,
          message: '😳 코드 삭제 완료!',
        });
      }),
  ).then(() => {
    info('[DELETE, DELETE /api/system/code] 시스템 코드 삭제');
  });
});

router.get('/temp', (req, res) => {
  const { getCodeGroup, temp } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_TEMP,
      {
        TMP: getCodeGroup,
      },
    )
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    info('[SELECT, GET /api/system/code/temp] 시스템 공통 코드 조회');
  });
});

module.exports = router;
