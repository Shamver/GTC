const express = require('express');

const router = express.Router();

const Database = require('../../Database');

const { info, error } = require('../../log-config');

const SELECT_BOARD_REPORT = `
  SELECT COUNT(*) AS count FROM GTC_BOARD_REPORT
  WHERE TARGET_ID = :TARGET_ID
  AND U_ID = :WRITER_ID
  AND TYPE = ':TYPE'
`;

const INSERT_BOARD_REPORT = `
  INSERT INTO GTC_BOARD_REPORT
  VALUES (
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_BOARD_REPORT) as temp),
    :TARGET_ID,
    :WRITER_ID,
    ':TYPE',
    ':REASON',
    ':DESCRIPTION'
  )
`;

router.post('/', (req, res) => {
  const {
    targetId, writerId, type, reason, description,
  } = req.body;

  Database.execute(
    (database) => database.query(
      SELECT_BOARD_REPORT,
      {
        TARGET_ID: targetId,
        WRITER_ID: writerId,
        TYPE: type,
      },
    )
      .then((rows) => {
        if (rows[0].count === 1) {
          res.json({
            SUCCESS: true,
            CODE: 2,
            MESSAGE: '😳 이미 해당 대상에 신고가 완료된 상태입니다!',
          });
          throw new Error('이미 신고한 사람입니다.');
        } else {
          return database.query(
            INSERT_BOARD_REPORT,
            {
              TARGET_ID: targetId,
              WRITER_ID: writerId,
              TYPE: type,
              REASON: reason,
              DESCRIPTION: description,
            },
          );
        }
      })
      .then(() => {
        res.json({
          SUCCESS: true,
          CODE: 1,
          MESSAGE: '😳 해당 포스팅에 신고가 완료되었어요.',
        });
      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/board/report] 게시글 신고');
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
