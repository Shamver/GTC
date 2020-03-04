const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');

const SELECT_CODE_GROUP = `
  SELECT
    CMGRP AS 'group'
    , CMGRP_NM AS groupName
    , CMGRP_DESC AS groupDesc
  FROM GTC_CODE_GROUP
`;

const SELECT_CODE = `
  SELECT
    CMGRP AS codeGroup
    , CMCD AS code
    , CMCD_NM AS codeName
    , CMCD_DESC AS codeDesc
    , CMCD_ORDER AS codeOrder
    , CMCD_USE_YN AS codeUseYN
  FROM GTC_CODE
  WHERE CMGRP = ':CODE_GROUP'
`;


router.get('/group', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_CODE_GROUP,
    )
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/system/code/group] 시스템 코드그룹 조회');
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
  const { codeGroup } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_CODE,
      {
        CODE_GROUP: codeGroup,
      },
    )
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/system/code] 시스템 코드 조회');
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
