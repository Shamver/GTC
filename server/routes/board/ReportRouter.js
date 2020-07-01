const express = require('express');

const router = express.Router();

const Database = require('../../Database');

const { info } = require('../../log-config');

const SELECT_REPORT = `
  SELECT 
    COUNT(*) AS count 
  FROM GTC_REPORT
  WHERE 
    TARGET_ID = :TARGET_ID
    AND USER_ID = :USER_ID
    AND TYPE_CD = ':TYPE_CD'
`;

const SELECT_ALL_REPORT = `
 SELECT R.ID AS reportId
    , R.TYPE_CD AS typeCode
    , R.TARGET_ID AS targetId
    , (SELECT NICKNAME FROM GTC_USER WHERE GTC_USER.ID = R.USER_ID) AS userId
    , R.REASON_CD AS reasonCode
    , (SELECT NAME FROM GTC_CODE WHERE GTC_CODE.CODE = R.REASON_CD) AS reason
    , R.REASON_DESC AS reasonDetail
    , DATE_FORMAT(R.CRT_DTTM, '%Y-%m-%d') AS reportDate
  FROM GTC_REPORT R
`;

const INSERT_REPORT = `
  INSERT INTO GTC_REPORT (
    TARGET_ID
    , USER_ID
    , TYPE_CD
    , REASON_CD
    , REASON_DESC
  ) VALUES (
    :TARGET_ID
    , :USER_ID
    , ':TYPE_CD'
    , ':REASON_CD'
    , ':REASON_DESC'
  )
`;

router.post('/', (req, res) => {
  const {
    targetId, writerId, type, reason, description,
  } = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_REPORT,
      {
        TARGET_ID: targetId,
        USER_ID: writerId,
        TYPE_CD: type,
      },
    )
      .then((rows) => {
        if (rows[0].count === 1) {
          res.json({
            success: true,
            code: 2,
            message: '😳 이미 해당 대상에 신고가 완료된 상태입니다!',
          });
          throw new Error('이미 신고한 사람입니다.');
        } else {
          return database.query(
            INSERT_REPORT,
            {
              TARGET_ID: targetId,
              USER_ID: writerId,
              TYPE_CD: type,
              REASON_CD: reason,
              REASON_DESC: description,
            },
          );
        }
      })
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: type === 'RP01' ? '😊 해당 포스팅에 신고가 완료되었어요.' : '😊 해당 댓글에 신고가 완료되었어요.',
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/board/Report] 게시글 신고');
  });
});

router.get('/', (req, res) => {
  Database.execute(
    (database) => database.query(
      SELECT_ALL_REPORT,
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '신고 이력 조회',
          result: rows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/Report] 신고 이력 조회');
  });
});

module.exports = router;
