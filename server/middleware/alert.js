const INSERT_USER_ALERT = `
  INSERT INTO GTC_USER_ALERT (
    COMMENT_ID,
    SHOW_FL,
    CRT_DTTM
  ) VALUES (
    :COMMENT_ID,
    1,
    sysdate()
  )
`;

const alertMiddleware = (database, id) => database.query(
  INSERT_USER_ALERT,
  {
    COMMENT_ID: id,
  },
);

module.exports = alertMiddleware;
