const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');

const { get, del } = require('../../middleware/latelyCookie');

const SELECT_LATELY_POST = `
  SELECT
    ID AS id
    , TITLE AS title
  FROM GTC_POST
  WHERE ID IN (:DATA)
  ORDER BY FIELD (id, :DATA)
`;

router.get('/', (req, res) => {
  const { lately } = req.cookies;

  if (lately !== '' && lately !== undefined) {
    const data = get(lately);

    Database.execute(
      (database) => database.query(
        SELECT_LATELY_POST,
        {
          DATA: data,
        },
      )
        .then((rows) => {
          res.json({
            SUCCESS: true,
            CODE: 1,
            MESSAGE: '최근 게시물 리스트 조회',
            DATA: rows,
          });
        }),
    ).then(() => {
      // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
      info('[SELECT, GET /api/cookie/lately] 최근 게시물 리스트 조회');
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
  } else {
    res.json({
      SUCCESS: true,
      CODE: 2,
      MESSAGE: '최근 읽은 게시물이 없습니다.',
    });
  }
});

router.delete('/', (req, res) => {
  const { lately } = req.cookies;
  const { id } = req.body;

  const resetCookie = del(lately, id.toString());

  res.cookie('lately', resetCookie, { httpOnly: true });
  res.json({
    SUCCESS: true,
    CODE: 1,
    MESSAGE: '😊 성공적으로 삭제되었습니다!',
  });
});

module.exports = router;
