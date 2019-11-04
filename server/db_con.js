const mysql = require('mysql');
const config = require('./config/db-config.json');

module.exports = () => ({
  init() {
    return mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    });
  },

  test_open(con) {
    con.connect((err) => {
      if (err) {
        console.error(`mysql connection error :${err}`);
      } else {
        console.info('mysql is connected successfully.');
      }
    });
  },
});
