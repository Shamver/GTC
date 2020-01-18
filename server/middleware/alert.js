const db = require('../dbConnection')();

const conn = db.init();

const alertMiddleware = (req, res, next) => {
  const { replyId } = req.body;

  const query = `INSERT INTO GTC_USER_ALERT
    VALUES(
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_ALERT) as temp),
    '${replyId}',
    'N',
    null,
    'Y'
    )`;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      next();
    } else {
      res.send(rows);
    }
  });
};

module.exports = alertMiddleware;
