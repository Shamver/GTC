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

const SELECT_CONSULT_ADMIN = `
  SELECT
    @ROWNUM := @ROWNUM+1 as rn
    , C.ID AS id
    , C.SUBJECT AS subject
    , C.CONSULT_DESC AS consultDesc
    , CC.NAME AS category
    , C.ANSWER_DESC AS answerDesc
    , IF(DATE_FORMAT(SYSDATE(), '%Y%m%d') = DATE_FORMAT(C.CRT_DTTM, '%Y%m%d'), DATE_FORMAT(C.CRT_DTTM, '%H:%i'), DATE_FORMAT(C.CRT_DTTM, '%Y-%m-%d')) AS date
    , C.ANSWER_FL AS answerFl
    , U.NICKNAME AS userName
    , (SELECT CEIL(COUNT(*)/:PER_PAGE) FROM GTC_CONSULT C)
      AS pageCount
    FROM
      GTC_CONSULT C
      LEFT JOIN GTC_CODE CC
      ON CC.CODE = C.CONSULT_CD
      LEFT JOIN GTC_USER U
      ON U.ID = C.USER_ID
      , (SELECT @ROWNUM := :CURRENT_PAGE) AS TEMP
    ORDER BY C.CRT_DTTM DESC
    LIMIT :CURRENT_PAGE, :PER_PAGE
`;

const UPDATE_CONSULT_ADMIN = `
  UPDATE GTC_CONSULT 
  SET 
    ANSWER_DESC = ':ANSWER'
    , ANSWER_USER_ID = :USER_ID
    , ANSWER_FL = 1
    , MFY_DTTM = SYSDATE()
   WHERE ID = :ID 
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
        CURRENT_PAGE: ((currentPage - 1) * 10),
        PER_PAGE: 10,
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

router.get('/admin', (req, res) => {
  const { currentPage } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_CONSULT_ADMIN,
      {
        CURRENT_PAGE: ((currentPage - 1) * 10),
        PER_PAGE: 10,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '관리자 1:1 문의 내역 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/consult/admin] 관리자 1:1 문의 내역 조회');
  });
});

router.put('/admin', (req, res) => {
  const { id, answer, userId } = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_CONSULT_ADMIN,
      {
        ID: id,
        ANSWER: answer,
        USER_ID: userId,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '관리자 1:1 문의 답변 등록',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/consult/admin] 관리자 1:1 문의 답변 등록');
  });
});

module.exports = router;
