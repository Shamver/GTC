const express = require('express');

const router = express.Router();
const { info } = require('../../log-config');
const Database = require('../../Database');

const INSERT_CODEGROUP = `
  INSERT INTO GTC_BOARD (
    ID
    , NAME
    , \`DESC\`
  ) VALUES (
    ':CODEGROUP_ID'
    , ':NAME'
    , ':DESC'
  )
`;

router.post('/', (req, res) => {
  const {
    id, name, desc, path,
    order, useFl, permissionLevel
  } = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_CODEGROUP,
      {
        ID: id,
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

module.exports = router;
