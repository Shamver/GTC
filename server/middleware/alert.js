const INSERT_USER_ALERT = `
  INSERT INTO GTC_USER_ALERT (
    COMMENT_ID
  ) VALUES (
    :COMMENT_ID
  )
`;

const alertMiddleware = (database, id) => database.query(
  INSERT_USER_ALERT,
  {
    COMMENT_ID: id,
  },
);

module.exports = alertMiddleware;
