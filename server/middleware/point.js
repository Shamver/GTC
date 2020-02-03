const db = require('../dbConnection')();

const conn = db.init();

const pointConfig = {
  addPost: 10,
  deletePost: -10,
  addReply: 1,
  deleteReply: -1,
};

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
