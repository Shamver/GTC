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

const INSERT_CODE_GROUP = `
  INSERT INTO GTC_CODE_GROUP
  VALUES (
    ':ID'
    , ':NAME'
    , ':DESC'
    , sysdate()
  )
`;

const UPDATE_CODE_GROUP = `
  UPDATE GTC_CODE_GROUP
  SET  
    CMGRP_NM = ':NAME'
    , CMGRP_DESC = ':DESC'
  WHERE CMGRP = ':ID'
`;

const DELETE_CODE_GROUP = `
  DELETE FROM GTC_CODE_GROUP
  WHERE CMGRP = ':GROUP'
`;

const INSERT_CODE = `
  INSERT INTO GTC_CODE
  VALUES (
    ':GROUP'
    , ':ID'
    , ':NAME'
    , ':DESC'
    , :ORDER
    , ':USE_YN'
    , sysdate()
  )
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

const UPDATE_CODE = `
  UPDATE GTC_CODE
  SET  
    CMCD_NM = ':NAME'
    , CMCD_DESC = ':DESC'
    , CMCD_ORDER = :ORDER
    , CMCD_USE_YN = ':USE_YN'
  WHERE CMGRP = ':GROUP'
  AND CMCD = ':CODE'
`;

const DELETE_CODE = `
  DELETE FROM GTC_CODE
  WHERE CMGRP = ':GROUP'
  AND CMCD = ':CODE'
`;


router.post('/group', (req, res) => {
  const { id, name, desc } = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_CODE_GROUP,
      {
        ID: id,
        NAME: name,
        DESC: desc,
      },
    )
      .then(() => {
        res.send(true);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, GET /api/system/code/group] 시스템 코드그룹 추가');
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

router.put('/group', (req, res) => {
  const { id, name, desc } = req.body;
  Database.execute(
    (database) => database.query(
      UPDATE_CODE_GROUP,
      {
        ID: id,
        NAME: name,
        DESC: desc,
      },
    )
      .then(() => {
        res.send(true);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[UPDATE, PUT /api/system/code/group] 시스템 코드그룹 수정');
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

router.delete('/group', (req, res) => {
  const { group } = req.query;
  Database.execute(
    (database) => database.query(
      DELETE_CODE_GROUP,
      {
        GROUP: group,
      },
    )
      .then(() => {
        res.send(true);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[DELETE, DELETE /api/system/code/group] 시스템 코드그룹 삭제');
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
  const {
    id, group,
    name, desc, order, useYN,
  } = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_CODE,
      {
        ID: id,
        GROUP: group,
        NAME: name,
        DESC: desc,
        ORDER: order,
        USE_YN: useYN,
      },
    )
      .then(() => {
        res.send(true);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/system/code] 시스템 코드 추가');
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
        GROUP: group,
        NAME: name,
        ORDER: order,
        DESC: desc,
        USE_YN: useYN,
      },
    )
      .then(() => {
        res.send(true);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[UPDATE, PUT /api/system/code] 시스템 코드 수정');
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
  const { group, code } = req.query;
  Database.execute(
    (database) => database.query(
      DELETE_CODE,
      {
        GROUP: group,
        CODE: code,
      },
    )
      .then(() => {
        res.send(true);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[DELETE, DELETE /api/system/code] 시스템 코드 삭제');
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
