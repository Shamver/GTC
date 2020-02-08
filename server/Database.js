const mysql = require('mysql');
const config = require('./config/db-config');

class Database {
  constructor() {
    this.connection = mysql.createConnection(config);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  execute(callback) {
    return callback(this).then(
      (result) => this.close().then(() => result),
      (err) => this.close().then(() => { throw err; }),
    );
  }
}


module.exports = new Database();
