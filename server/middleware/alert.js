const { error, info } = require('../log-config');
const Database = require('../Database');

const INSERT_USER_ALERT = `
  INSERT INTO GTC_USER_ALERT
  VALUES(
  (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_ALERT) as temp),
  (SELECT ID FROM (SELECT (MAX(ID)) AS ID FROM GTC_BOARD_REPLY) as temp),
  'N',
  null,
  'Y'
  )
`;

const alertMiddleware = (res) => {
  Database.execute(
    (database) => database.query(
      INSERT_USER_ALERT,
      {
      },
    )
      .then(() => res.send({
        SUCCESS: true,
        CODE: 1,
        MESSAGE: '성공적으로 읽었습니다.',
      })),
  ).then(() => {
    // 한 DB 트랜잭션이 끝나고 하고 싶은 짓.
    info('[INSERT, POST /api/user/alert] 유저 알림 읽음 처리');
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

module.exports = alertMiddleware;
