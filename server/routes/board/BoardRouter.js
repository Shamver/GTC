const express = require('express');

const router = express.Router();

const db = require('../../dbConnection')();

const conn = db.init();

router.get('/', (req, res) => {
  const data = req.query;
  const query = `SELECT CONCAT('/', LOWER(B_ID)) AS currentBoard 
        FROM GTC_BOARD_POST
        WHERE ID = ${data.id}
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows[0].currentBoard);
  });
});

module.exports = router;
