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
    NOT IN(CANCEL_FL = 1 OR REJECT_FL = 1)
`;

const SELECT_ALL_REPORT = `
  SELECT
    @ROWNUM := @ROWNUM + 1 AS rn
    , (SELECT Ceil(COUNT(*)/:MAX_COUNT) FROM GTC_REPORT) AS pageCount 
    , R.ID AS reportId
    , R.TYPE_CD AS typeCode
    , R.TARGET_ID AS targetContentsId
    , CASE
        WHEN R.TYPE_CD = 'RT01' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RT02' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RT03' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = R.TARGET_ID) END
        AS targetName
    , CASE
        WHEN R.TYPE_CD = 'RT01' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RT02' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RT03' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = R.TARGET_ID) END
        AS targetUserId
    , (SELECT NICKNAME FROM GTC_USER WHERE GTC_USER.ID = R.USER_ID) AS userId
    , (SELECT NAME FROM GTC_CODE WHERE GTC_CODE.CODE = R.TYPE_CD) AS contents
    , R.REASON_CD AS reasonCode
    , (SELECT NAME FROM GTC_CODE WHERE GTC_CODE.CODE = R.REASON_CD) AS reason
    , R.REASON_DESC AS reasonDetail
    , DATE_FORMAT(R.CRT_DTTM, '%Y-%m-%d') AS reportDate
    , DATE_FORMAT(R.MFY_DTTM, '%Y-%m-%d') AS rejectDate
    , CASE
        WHEN R.CANCEL_FL = 0 AND R.DISPOSE_FL = 1  THEN '정지'
        WHEN R.CANCEL_FL = 1 AND R.DISPOSE_FL = 1 THEN '정지 취소'
        WHEN R.REJECT_FL = 1 THEN '반려' END AS reportResult
     , (SELECT NICKNAME FROM GTC_USER WHERE ID = R.MANAGER_ID) AS managerId
  FROM GTC_REPORT R
  WHERE
    CASE
      WHEN ':TAB' = 'reportTable' THEN
        R.REJECT_FL = 0 AND R.DISPOSE_FL = 0
      WHEN ':TAB' = 'reportResult' THEN
        R.REJECT_FL = 1 OR R.DISPOSE_FL = 1
    END
  ORDER BY
    CASE
      WHEN ':TAB' = 'reportTable' THEN R.CRT_DTTM
      WHEN ':TAB' = 'reportResult' THEN R.MFY_DTTM
    END
  DESC
  LIMIT :ROWNUM, :MAX_COUNT
`;

const INSERT_REPORT = `
  INSERT INTO GTC_REPORT (
    TARGET_ID
    , USER_ID
    , TYPE_CD
    , REASON_CD
    , REASON_DESC
    , CRT_DTTM
  ) VALUES (
    :TARGET_ID
    , :USER_ID
    , ':TYPE_CD'
    , ':REASON_CD'
    , ':REASON_DESC'
    , SYSDATE()
  )
`;

const SELECT_DETAIL_REPORT = `
 SELECT R.ID AS reportId
    , R.TYPE_CD AS typeCode
    , R.TARGET_ID AS targetContentsId
    , CASE
        WHEN R.TYPE_CD = 'RT01' THEN (SELECT P.TITLE FROM GTC_POST P WHERE P.ID = R.TARGET_ID)
        WHEN R.TYPE_CD = 'RT02' THEN (SELECT C.CONTENT FROM GTC_COMMENT C WHERE C.ID = R.TARGET_ID) END
        AS targetContents
    , CASE
        WHEN R.TYPE_CD = 'RT01' THEN R.TARGET_ID
        WHEN R.TYPE_CD = 'RT02' THEN (SELECT C.POST_ID FROM GTC_COMMENT C WHERE C.ID = R.TARGET_ID) END
        AS targetContentsLink
    , CASE
        WHEN R.TYPE_CD = 'RT01' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RT02' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RT03' THEN (SELECT C.NICKNAME FROM GTC_USER C WHERE C.ID = R.TARGET_ID) END
        AS targetUserName
    , CASE
        WHEN R.TYPE_CD = 'RT01' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_POST WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RT02' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = (SELECT USER_ID FROM GTC_COMMENT WHERE ID = R.TARGET_ID))
        WHEN R.TYPE_CD = 'RT03' THEN (SELECT C.ID FROM GTC_USER C WHERE C.ID = R.TARGET_ID) END
        AS targetUserId
    , (SELECT NICKNAME FROM GTC_USER WHERE GTC_USER.ID = R.USER_ID) AS userId
    , R.REASON_CD AS reasonCode
    , (SELECT NAME FROM GTC_CODE WHERE GTC_CODE.CODE = R.REASON_CD) AS reason
    , R.REASON_DESC AS reasonDetail
    , CASE
        WHEN R.CANCEL_FL = 0 AND R.DISPOSE_FL = 1  THEN '정지'
        WHEN R.CANCEL_FL = 1 AND R.DISPOSE_FL = 1 THEN '정지 취소'
        WHEN R.REJECT_FL = 1 THEN '반려' END AS reportResult
    , DATE_FORMAT(R.CRT_DTTM, '%Y-%m-%d') AS reportDate
    , (SELECT NICKNAME FROM GTC_USER WHERE ID = R.MANAGER_ID) AS managerId
    , U.SUSPEND_BAN_FL AS suspendBanFl
    , U.TEMP_BAN_FL AS tempBanFl
    , U.BAN_REASON AS tookReason
    , DATE_FORMAT(U.BAN_TERM,'%Y-%m-%d') AS tookBanTerm
    , DATE_FORMAT(U.CRT_DTTM,'%Y-%m-%d') AS tookDate
    , CASE
        WHEN R.REJECT_FL = 1 THEN DATE_FORMAT(R.MFY_DTTM,'%Y-%m-%d') 
        WHEN R.REJECT_FL = 0 THEN DATE_FORMAT(U.CRT_DTTM,'%Y-%m-%d') END AS tookDate
  FROM GTC_REPORT R
  LEFT JOIN GTC_USER_BAN U
  ON U.REPORT_ID = R.ID
  WHERE R.ID = :REPORT_ID
`;

const UPDATE_REPORT_REJECT = `
  UPDATE GTC_REPORT R
  SET 
    REJECT_FL = 1,
    MANAGER_ID = :MANAGER_ID
  WHERE ID = :REPORT_ID;
`;

router.post('/', (req, res) => {
  const {
    targetId, writerId, type, reason, description,
  } = req.body;
  let msg;
  if (type === 'RT01') {
    msg = '😊 해당 포스팅 신고가 완료되었어요.';
  } else if (type === 'RT02') {
    msg = '😊 해당 댓글 신고가 완료되었어요.';
  } else {
    msg = '😊 해당 유저 신고가 완료되었어요.';
  }

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
          message: msg,
        });
      }),
  ).then(() => {
    info('[INSERT, POST /api/board/Report] 게시글 신고');
  });
});

router.get('/', (req, res) => {
  const { tab } = req.query;
  let { currentPage } = req.query;
  currentPage = currentPage || 1;

  const MaxCount = 30;

  Database.execute(
    (database) => database.query(
      SELECT_ALL_REPORT,
      {
        MAX_COUNT: MaxCount,
        TAB: tab,
        ROWNUM: (currentPage - 1) * MaxCount,
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
      SELECT_DETAIL_REPORT,
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
  const { reportId, managerId } = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_REPORT_REJECT,
      {
        REPORT_ID: reportId,
        MANAGER_ID: managerId,
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
