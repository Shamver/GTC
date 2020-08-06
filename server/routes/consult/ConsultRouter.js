const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');

const Database = require('../../Database');

const INSERT_CONSULT_ROW = `
  INSERT INTO GTC_CONSULT (
    USER_ID,
    SUBJECT,
    CONSULT_DESC,
    CONSULT_CD
  ) VALUES (
    :USER_ID,
    ':SUBJECT',
    ':CONSULT_DESC',
    ':CONSULT_CD'
  );
`;

const SELECT_CONSULT_MINE = `
  SELECT
    @ROWNUM := @ROWNUM+1 as rn
    , C.ID AS id
    , C.SUBJECT AS subject
    , C.CONSULT_DESC AS consultDesc
    , CC.NAME AS category
    , C.ANSWER_DESC AS answerDesc
    , IF(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(C.CRT_DTTM, '%Y%m%d'), DATE_FORMAT(C.CRT_DTTM, '%H:%i'), DATE_FORMAT(C.CRT_DTTM, '%Y-%m-%d')) AS date
    , C.ANSWER_FL AS answerFl
    , (SELECT CEIL(COUNT(*)/:PER_PAGE) FROM GTC_CONSULT C WHERE C.USER_ID = :USER_ID)
      AS pageCount
    FROM
      GTC_CONSULT C
      LEFT JOIN GTC_CODE CC
      ON CC.CODE = C.CONSULT_CD
      , (SELECT @ROWNUM := :CURRENT_PAGE) AS TEMP
    WHERE
      C.USER_ID = :USER_ID
    ORDER BY C.CRT_DTTM DESC
    LIMIT :CURRENT_PAGE, :PER_PAGE
`;

router.post('/', (req, res) => {
  const { userId, subject, text, currentCategory } = req.body;

  Database.execute(
    (database) => database.query(
      INSERT_CONSULT_ROW,
      {
        USER_ID: userId,
        SUBJECT: subject,
        CONSULT_DESC: text,
        CONSULT_CD: currentCategory,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '1:1 문의 등록 완료!',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/consult] 1:1 문의 등록');
  });
});

router.get('/', (req, res) => {
  const { userId, currentPage } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_CONSULT_MINE,
      {
        USER_ID: userId,
        CURRENT_PAGE: ((currentPage - 1) * 25),
        PER_PAGE: 15,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '사용자 1:1 문의 내역 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/consult] 사용자 1:1 문의 내역 조회');
  });
});

module.exports = router;
