const db = require('../dbConnection')();

const conn = db.init();

const alertMiddleware = () => {
  const query = `INSERT INTO GTC_USER_ALERT
    VALUES(
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_ALERT) as temp),
    (SELECT ID FROM (SELECT (MAX(ID)) AS ID FROM GTC_BOARD_REPLY) as temp),
    'N',
    null,
    'Y'
    )`;

  conn.query(query, (err) => {
    if (err) throw err;
  });
};

module.exports = alertMiddleware;
