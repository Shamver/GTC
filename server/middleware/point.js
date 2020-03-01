const { error, info } = require('../log-config');
const Database = require('../Database');

const pointConfig = {
  addPost: 10,
  deletePost: -10,
  addReply: 1,
  deleteReply: -1,
};

const INSERT_POINT = `
  INSERT INTO GTC_USER_POINT VALUES(
  (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_POINT) as temp),
  ':TYPE',
  ':BP_ID',
  :REPLY_ID,
  :COST,
  ':WRITER',
  sysdate()
)
`;

module.exports = (action, type, data) => {
  const replyId = data.replyId ? `'${data.replyId}'` : null;
  const cost = pointConfig[action];

  Database.execute(
    (database) => database.query(
      INSERT_POINT,
      {
        TYPE: type,
        BP_ID: data.bpId,
        REPLY_ID: replyId,
        COST: cost,
        WRITER: data.writer,
      },
    )
      .then(() => {

      }),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, MIDDLEWARE POINT] 포인트 추가');
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
};
