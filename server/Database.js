const mysql = require('mysql');
const config = require('./config/db-config');

class Database {
  constructor() {
    this.connection = mysql.createConnection(config);
    this.connection.config.queryFormat = (query, values) => {
      if (!values) return query;
      return query.replace(/:(\w+)/g, (txt, key) => {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          return values[key];
        }
        return txt;
      });
    };
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) reject(err);
        resolve(rows, reject);
      });
    });
  }

  execute(callback) {
    return callback(this).then(
      (result) => result,
      (err) => { throw err; },
    );
  }
}

module.exports = new Database();
