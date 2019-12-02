const express = require('express');

const router = express.Router();
const db = require('../db_con')();

const conn = db.init();

router.get('/ignore', (req, res) => {
  const data = req.body;

  console.log(req.params);

  const query = `SELECT GUI.ID AS id, GUI.FROM_ID AS f_id, GUI.TARGET_ID AS t_id, date_format(GUI.DATE, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date, GU.U_NICKNAME AS nickname FROM GTC_USER_IGNORE GUI LEFT JOIN GTC_USER GU
    ON GUI.TARGET_ID = GU.U_ID
    WHERE GUI.FROM_ID='${data.user_id}'
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

router.delete('/ignore', (req, res) => {
  const data = req.body;

  const query = `DELETE FROM GTC_USER_IGNORE
    WHERE ID IN (${data.list.join()})
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    if (rows.length >= 1) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});


module.exports = router;
