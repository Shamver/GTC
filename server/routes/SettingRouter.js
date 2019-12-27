const express = require('express');

const router = express.Router();
const db = require('../db_con')();

const conn = db.init();

router.get('/ignore', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT GUI.ID AS id, GUI.FROM_ID AS f_id, GUI.TARGET_ID AS t_id, date_format(GUI.DATE, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date, GU.NICKNAME AS nickname FROM GTC_USER_IGNORE GUI LEFT JOIN GTC_USER GU
    ON GUI.TARGET_ID = GU.ID
    WHERE GUI.FROM_ID='${userId}'
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
    if (rows.length >= 1) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});

// 나중에 해당 포스트 제목 받아오는 쿼리도 넣어야 함.
router.get('/favorite', (req, res) => {
  const { userId } = req.query;

  const query = `SELECT GUFP.ID AS id, GUFP.USER_ID AS f_id, GUFP.POST_ID AS nickname, date_format(GUFP.DATE, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date FROM GTC_USER_FAVORITE_POST GUFP LEFT JOIN GTC_USER GU
    ON GUFP.USER_ID = GU.ID
    WHERE GUFP.USER_ID='${userId}'
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

router.delete('/favorite', (req, res) => {
  const data = req.body;

  const query = `DELETE FROM GTC_USER_FAVORITE_POST
    WHERE ID IN (${data.list.join()})
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

router.delete('/withdrawal', (req, res) => {
  const { userId } = req.body;

  const query = `
    UPDATE GTC_USER
    SET DELETED_DATE = sysdate()
    WHERE ID = '${userId}';
  `;

  conn.query(query, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});

module.exports = router;
