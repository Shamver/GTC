const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');

const { get, del } = require('../../middleware/latelyCookie');

const SELECT_LATELY_POST = `
  SELECT
    ID AS id
    , TITLE AS title
  FROM GTC_POST
  WHERE ID IN (:DATA)
  ORDER BY FIELD (id,:DATA)
`;

router.get('/', (req, res) => {
  const { lately } = req.cookies;
  if (lately) {
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
            success: true,
            code: 1,
            message: '최근 게시물 리스트 조회',
            result: rows,
          });
        }),
    ).then(() => {
      info('[SELECT, GET /api/cookie/lately] 최근 게시물 리스트 조회');
    });
  } else {
    res.json({
      success: true,
      code: 2,
      message: '최근 읽은 게시물이 없습니다.',
      result: [],
    });
  }
});

router.delete('/', (req, res) => {
  const { lately } = req.cookies;
  const { id } = req.body;

  const resetCookie = del(lately, id.toString());

  res.cookie('lately', resetCookie, { httpOnly: true });
  res.json({
    success: true,
    code: 1,
    message: '😊 성공적으로 기록이 삭제되었습니다!',
  });
});

module.exports = router;
