const express = require('express');

const router = express.Router();
const db = require('../../dbConnection')();

const conn = db.init();

router.get('/', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT GUI.FROM_ID AS f_id, GUI.TARGET_ID AS t_id, date_format(GUI.DATE, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date, GU.NICKNAME AS nickname FROM GTC_USER_IGNORE GUI LEFT JOIN GTC_USER GU
    ON GUI.TARGET_ID = GU.ID
    WHERE GUI.FROM_ID='${userId}'
    `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      let i = 0;
      const returnRows = rows.map((v) => {
        i += 1;
        return {
          ...v,
          id: i,
        };
      });
      res.send(returnRows);
    } else {
      res.send(rows);
    }
  });
});

router.delete('/', (req, res) => {
  const data = req.body;
  const {
    list,
  } = data;
  let subQuery = '';

  for (let i = 0; i < list.length; i += 1) {
    subQuery += `(FROM_ID=${list[i].f_id} AND TARGET_ID=${list[i].t_id})`;
    if (i !== list.length - 1) subQuery += ' OR ';
  }

  const query = `DELETE FROM GTC_USER_IGNORE
    WHERE
    (FROM_ID, TARGET_ID) IN (
    SELECT FROM_ID, TARGET_ID from (
    SELECT FROM_ID, TARGET_ID FROM GTC_USER_IGNORE
    WHERE
    ${subQuery}) as sub
    );
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length >= 1) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});

module.exports = router;
