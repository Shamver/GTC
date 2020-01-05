const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const db = require('../db_con')();

const conn = db.init();

router.get('/alert', (req, res) => {
  const { userId } = req.query;

  // const query = `SELECT GUI.FROM_ID AS f_id, GUI.TARGET_ID AS t_id, date_format(GUI.DATE, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date, GU.NICKNAME AS nickname FROM GTC_USER_IGNORE GUI LEFT JOIN GTC_USER GU
  //   ON GUI.TARGET_ID = GU.ID
  //   WHERE GUI.FROM_ID='${userId}'
  //   `;
  //
  // conn.query(query, (err, rows) => {
  //   if (err) throw err;
  //   if (rows.length >= 1) {
  //     res.send(rows);
  //   } else {
  //     res.send(rows);
  //   }
  // });
  res.send(200);
});

router.delete('/alert', (req, res) => {
  const { type, id = null } = req.body;

  console.log(type, id);

  res.send(200);
});

module.exports = router;
