const express = require('express');

const router = express.Router();
const db = require('../db_con')();

const conn = db.init();

router.post('/getignore', (req, res) => {
  const data = req.body;
  const query = `SELECT GUI.ID AS id, GUI.FROM_ID AS f_id, GUI.TARGET_ID AS t_id, GUI.DATE AS date, GU.U_NICKNAME AS nickname FROM GTC_USER_IGNORE GUI LEFT JOIN GTC_USER GU
    ON GUI.TARGET_ID = GU.U_ID
    WHERE GUI.FROM_ID='${data.user_id}';
    `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(rows);
    } else {
      res.send(rows);
    }
  });
});


module.exports = router;
