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

module.exports = router;
