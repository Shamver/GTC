const INSERT_USER_ALERT = `
  INSERT INTO GTC_USER_ALERT
  VALUES(
  (SELECT * FROM (SELECT IFNULL(MAX(ID)+1,1) FROM GTC_USER_ALERT) as temp),
  :ID,
  'N',
  null,
  'Y'
  )
`;

const alertMiddleware = (database, id) => database.query(
  INSERT_USER_ALERT,
  {
    ID: id,
  },
);

module.exports = alertMiddleware;
