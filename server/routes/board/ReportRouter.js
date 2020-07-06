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
    , R.TARGET_ID AS targetContentsId
    , CASE
        WHEN R.TYPE_CD = 'RP01' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RP02' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID))
        ELSE (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID)) END /* <- 유저 대상 넣을 곳 임시 주석 */
        AS targetName
    , CASE
        WHEN R.TYPE_CD = 'RP01' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RP02' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID))
        ELSE (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID)) END /* <- 유저 대상 넣을 곳 임시 주석 */
        AS targetUserId
    , (SELECT NICKNAME FROM GTC_USER WHERE GTC_USER.ID = R.USER_ID) AS userId
    , R.REASON_CD AS reasonCode
    , (SELECT NAME FROM GTC_CODE WHERE GTC_CODE.CODE = R.REASON_CD) AS reason
    , R.REASON_DESC AS reasonDetail
    , DATE_FORMAT(R.CRT_DTTM, '%Y-%m-%d') AS reportDate
    , CASE
        WHEN (SELECT C.BANNED_FL FROM GTC_USER C WHERE C.ID = targetUserId) THEN '밴'
        WHEN R.REJECT_FL = 1 THEN '반려' END AS reportResult
  FROM GTC_REPORT R
  WHERE
    CASE
      WHEN ':TAB' = 'reportTable' THEN
        ( R.REJECT_FL = 0 AND
        CASE
          WHEN R.TYPE_CD = 'RP01' THEN (SELECT C.BANNED_FL FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
          WHEN R.TYPE_CD = 'RP02' THEN (SELECT C.BANNED_FL FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID)) END = 0)
      WHEN ':TAB' = 'reportResult' THEN
        ( R.REJECT_FL = 1 OR
        CASE
          WHEN R.TYPE_CD = 'RP01' THEN (SELECT C.BANNED_FL FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
          WHEN R.TYPE_CD = 'RP02' THEN (SELECT C.BANNED_FL FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID)) END = 1)
      WHEN ':TAB' = 'reportUser' THEN
        CASE
          WHEN R.TYPE_CD = 'RP01' THEN (SELECT C.BANNED_FL FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
          WHEN R.TYPE_CD = 'RP02' THEN (SELECT C.BANNED_FL FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID)) END = 1
    END
  ORDER BY R.CRT_DTTM DESC
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

const SELECT_DEATAIL_REPORT = `
 SELECT R.ID AS reportId
    , R.TYPE_CD AS typeCode
    , R.TARGET_ID AS targetContentsId
    , CASE
        WHEN R.TYPE_CD = 'RP01' THEN (SELECT P.TITLE FROM GTC_POST P WHERE P.ID = R.TARGET_ID)
        WHEN R.TYPE_CD = 'RP02' THEN (SELECT C.CONTENT FROM GTC_COMMENT C WHERE C.COMMENT_ID = R.TARGET_ID) END
        AS targetContents
    , CASE
        WHEN R.TYPE_CD = 'RP01' THEN R.TARGET_ID
        WHEN R.TYPE_CD = 'RP02' THEN (SELECT C.POST_ID FROM GTC_COMMENT C WHERE C.ID = R.TARGET_ID) END
        AS targetContentsLink
    , CASE
        WHEN R.TYPE_CD = 'RP01' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RP02' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID))
        ELSE (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID)) END /* <- 유저 대상 넣을 곳 임시 주석 */
        AS targetUserName
    , CASE
        WHEN R.TYPE_CD = 'RP01' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RP02' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID))
        ELSE (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE COMMENT_ID = R.TARGET_ID)) END /* <- 유저 대상 넣을 곳 임시 주석 */
        AS targetUserId
    , (SELECT NICKNAME FROM GTC_USER WHERE GTC_USER.ID = R.USER_ID) AS userId
    , R.REASON_CD AS reasonCode
    , (SELECT NAME FROM GTC_CODE WHERE GTC_CODE.CODE = R.REASON_CD) AS reason
    , R.REASON_DESC AS reasonDetail
    , DATE_FORMAT(R.CRT_DTTM, '%Y-%m-%d') AS reportDate
  FROM GTC_REPORT R
  WHERE R.ID = :REPORT_ID
`;

const UPDATE_REPORT_REJECT = `
  UPDATE GTC_REPORT
  SET REJECT_FL = 1
  WHERE ID = :REPORT_ID;
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
  const { tab } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_ALL_REPORT,
      {
        TAB: tab,
      },
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

router.get('/detail', (req, res) => {
  const { reportId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_DEATAIL_REPORT,
      {
        REPORT_ID: reportId,
      },
    )
      .then((rows) => {
        res.json({
          success: true,
          code: 1,
          message: '신고 이력 상세 조회',
          result: rows[0],
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/board/Report/detail] 신고 이력 상세 조회');
  });
});

router.put('/reject', (req, res) => {
  const { reportId } = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_REPORT_REJECT,
      {
        REPORT_ID: reportId,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '😊 해당 신고를 반려 처리 했습니다.',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/board/Report/detail] 해당 신고 반려 처리');
  });
});

module.exports = router;
