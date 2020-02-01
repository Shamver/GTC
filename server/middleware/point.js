const pointConfig = require('../config/point-config');
const db = require('../dbConnection')();

const conn = db.init();

module.exports = (action, type, data) => {
  const replyId = data.replyId ? `'${data.replyId}'` : null;
  const cost = pointConfig[action];
  const query = `
   INSERT INTO GTC_USER_POINT VALUES(
        (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_POINT) as temp),
        '${type}',
        '${data.bpId}',
        ${replyId},
        ${cost},
        '${data.writer}',
        sysdate()
    )
  `;

  conn.query(query, (err) => {
    if (err) throw err;
  });
};
