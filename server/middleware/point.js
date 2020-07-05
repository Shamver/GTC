const { info } = require('../log-config');
const Database = require('../Database');

const pointConfig = {
  addPost: 10,
  deletePost: -10,
  addReply: 1,
  deleteReply: -1,
};

const INSERT_POINT = `
  INSERT INTO GTC_USER_POINT (
    USER_ID
    , TARGET_ID
    , TYPE_CD
    , COST
    , CRT_DTTM
  ) VALUES (
    :USER_ID
    , :TARGET_ID
    , ':TYPE_CD'
    , :COST
    , SYSDATE()
  )
`;

const INSERT_USER_POINT = `
  UPDATE GTC_USER
    SET POINT = POINT + :COST
    WHERE ID = :USER_ID
`;

module.exports = (action, type, data) => {
  const replyId = data.replyId ? `'${data.replyId}'` : null;
  const cost = action === 'custom' ? data.cost : pointConfig[action];

  let target;

  if (replyId) {
    target = replyId;
  } else if (data.bpId) {
    target = data.bpId;
  } else {
    target = null;
  }

  Database.execute(
    (database) => database.query(
      INSERT_POINT,
      {
        TYPE_CD: type,
        POST_ID: data.bpId || null,
        TARGET_ID: target,
        COST: cost,
        USER_ID: data.writer,
      },
    )
      .then(() => database.query(
        INSERT_USER_POINT,
        {
          COST: cost,
          USER_ID: data.writer,
        },
      )),
  ).then(() => {
    info('[INSERT, MIDDLEWARE POINT] 포인트 이벤트');
  });
};
