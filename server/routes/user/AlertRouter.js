const express = require('express');

const router = express.Router();

const { error, info } = require('../../log-config');
const Database = require('../../Database');
const filter = require('../../middleware/content');

const SELECT_USER_ALERT_LIST = `
  SELECT GUA.ID AS id, GUA.READ_YN AS isRead,
  CASE WHEN GBR.ID = GBR.ID_REPLY THEN 'reply'
         ELSE 'rereply'
       END as type,
  GBP.ID AS postId, GBP.TITLE AS postTitle,
  GBR.ID AS replyId, GBR.CONTENT AS replyContent,
  CASE WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MINUTE),'%Y-%m-%d %H:%i:%s') THEN '몇초 전'
            WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 HOUR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MINUTE, GBR.DATE, SYSDATE()),'분 전')
            WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 DAY),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(HOUR, GBR.DATE, SYSDATE()),'시간 전')
            WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 MONTH),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(DAY, GBR.DATE, SYSDATE()),'일 전')
            WHEN GBR.DATE > DATE_FORMAT(DATE_ADD(sysdate(),INTERVAL -1 YEAR),'%Y-%m-%d %H:%i:%s') THEN CONCAT(TIMESTAMPDIFF(MONTH, GBR.DATE, SYSDATE()),'달 전')
           ELSE CONCAT(TIMESTAMPDIFF(YEAR,GBR.DATE, SYSDATE()),'년 전')
        END  as replyDate,
  GU.NICKNAME AS replyName
  FROM GTC_USER_ALERT GUA, GTC_BOARD_POST GBP, GTC_BOARD_REPLY GBR, GTC_USER GU
  WHERE GBP.ID = GBR.BP_ID and
  GBR.ID = GUA.REPLY_ID and
  GU.ID = GBR.WRITER and
  GBP.WRITER = :USER_ID and
  GUA.SHOW_YN = 'Y' and
  (
    (GUA.READ_YN = 'N')
    OR
    (TIMESTAMPDIFF(minute, date_format(GUA.READ_DATE, '%Y-%m-%d %H:%i'), date_format(sysdate(), '%Y-%m-%d %H:%i')) < 1441)
  )
`;

const UPDATE_USER_ALERT_READ = `
  UPDATE GTC_USER_ALERT
  SET READ_YN = 'Y', READ_DATE = sysdate()
  WHERE id in (:ID_LIST)
`;

const UPDATE_USER_ALERT_DELETE = `
  UPDATE GTC_USER_ALERT
  SET SHOW_YN = 'N'
  WHERE id = :ID
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
        res.send(returnRows.reverse());
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[SELECT, GET /api/user/alert] 유저 알림 리스트 조회');
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
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[UPDATE, PUT /api/user/alert] 유저 알림 읽음 처리');
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
});

router.delete('/', (req, res) => {
  const { id } = req.body;

  Database.execute(
    (database) => database.query(
      UPDATE_USER_ALERT_DELETE,
      {
        ID: id,
      },
    )
      .then((rows) => {
        res.send(rows);
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[UPDATE, DELETE /api/user/alert] 유저 알림 삭제');
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
});

module.exports = router;
