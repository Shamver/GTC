const INSERT_USER_ALERT = `
  INSERT INTO GTC_USER_ALERT (
    ID
    , COMMENT_ID
  ) VALUES (
    (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_ALERT) as temp)
    , :COMMENT_ID
  )
`;

const alertMiddleware = (database, id) => database.query(
  INSERT_USER_ALERT,
  {
    COMMENT_ID: id,
  },
);

module.exports = alertMiddleware;
