const INSERT_USER_ALERT = `
  INSERT INTO GTC_USER_ALERT (
    COMMENT_ID,
    SHOW_FL
  ) VALUES (
    :COMMENT_ID,
    1
  )
`;

const alertMiddleware = (database, id) => database.query(
  INSERT_USER_ALERT,
  {
    COMMENT_ID: id,
  },
);

module.exports = alertMiddleware;
