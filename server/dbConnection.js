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
});
