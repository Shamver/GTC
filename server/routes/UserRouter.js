const express = require('express');

const router = express.Router();

const db = require('../db_con')();

const conn = db.init();

router.post('/register', (req, res) => {
  req.session.user = {
    name: 'gd',
  };
});

module.exports = router;