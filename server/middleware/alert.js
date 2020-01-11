const db = require('../dbConnection')();

const conn = db.init();

const alertMiddleware = (req, res, next) => {
  const { postId, replyId, depth } = req.body;

  const type = depth > 0 ? 'rereply' : 'reply';

  const query = `INSERT INTO GTC_USER_ALERT
    VALUES(
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_ALERT) as temp),
    '${postId}',
    '${replyId}',
    '${type}',
    'Y',
    null
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
