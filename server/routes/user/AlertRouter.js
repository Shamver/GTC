const express = require('express');

const router = express.Router();

const { info } = require('../../log-config');
const Database = require('../../Database');
const filter = require('../../middleware/content');

const SELECT_USER_ALERT_LIST = `
  SELECT 
    GUA.ID AS id
    , GUA.READ_FL AS isRead
    , CASE WHEN GBR.ID = GBR.COMMENT_ID THEN 'COMMENT'
        ELSE 'REPLY'
      END as type
    , GBP.ID AS postId, GBP.TITLE AS postTitle
    , GBR.ID AS replyId, GBR.CONTENT AS replyContent
    , CASE WHEN GBR.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇초 전'
        WHEN GBR.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(), INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, GBR.CRT_DTTM, SYSDATE()),'분 전')
        WHEN GBR.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(), INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, GBR.CRT_DTTM, SYSDATE()),'시간 전')
        WHEN GBR.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(), INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY, GBR.CRT_DTTM, SYSDATE()),'일 전')
        WHEN GBR.CRT_DTTM > DATE_FORMAT(DATE_ADD(SYSDATE(), INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH, GBR.CRT_DTTM, SYSDATE()),'달 전')
      ELSE CONCAT(TIMESTAMPDIFF(YEAR, GBR.CRT_DTTM, SYSDATE()),'년 전')
      END  as replyDate
    , GU.NICKNAME AS replyName
  FROM 
    GTC_USER_ALERT GUA
    , GTC_POST GBP
    , GTC_COMMENT GBR
    , GTC_USER GU
  WHERE 
    GBP.ID = GBR.POST_ID
    AND GBR.ID = GUA.COMMENT_ID 
    AND GU.ID = GBR.USER_ID
    AND GBP.USER_ID = :USER_ID
    AND GUA.SHOW_FL = 1
    AND (
      (GUA.READ_FL = 0)
      OR (TIMESTAMPDIFF(MINUTE, DATE_FORMAT(GUA.READ_DTTM, '%Y-%m-%d %H:%i'), DATE_FORMAT(SYSDATE(), '%Y-%m-%d %H:%i')) < 1441)
    )
    ORDER BY GBR.CRT_DTTM DESC
`;

const UPDATE_USER_ALERT_READ = `
  UPDATE GTC_USER_ALERT
  SET 
    READ_FL = 1
  WHERE ID IN (:ID_LIST)
`;

const UPDATE_USER_ALERT_DELETE = `
  UPDATE GTC_USER_ALERT
  SET SHOW_FL = 0
  WHERE ID = :ALERT_ID
`;

router.get('/', (req, res) => {
  const { userId } = req.query;

  Database.execute(
    (database) => database.query(
      SELECT_USER_ALERT_LIST,
      {
        USER_ID: userId,
      },
    )
      .then((rows) => {
        const returnRows = rows.map((v) => ({
          ...v,
          replyContent: filter(v.replyContent),
        }));
        res.json({
          success: true,
          code: 1,
          message: '알림 목록 조회',
          result: returnRows,
        });
      }),
  ).then(() => {
    info('[SELECT, GET /api/user/alert] 유저 알림 리스트 조회');
  });
});

router.put('/', (req, res) => {
  const { id } = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_USER_ALERT_READ,
      {
        ID_LIST: id.join(),
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '성공적으로 읽었습니다.',
        });
      }),
  ).then(() => {
    info('[UPDATE, PUT /api/user/alert] 유저 알림 읽음 처리');
  });
});

router.delete('/', (req, res) => {
  const { id } = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_USER_ALERT_DELETE,
      {
        ALERT_ID: id,
      },
    )
      .then(() => {
        res.json({
          success: true,
          code: 1,
          message: '성공적으로 삭제됐습니다.',
        });
      }),
  ).then(() => {
    info('[UPDATE, DELETE /api/user/alert] 유저 알림 삭제');
  });
});

module.exports = router;
