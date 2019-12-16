const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const db = require('../db_con')();

const conn = db.init();

module.exports = router;