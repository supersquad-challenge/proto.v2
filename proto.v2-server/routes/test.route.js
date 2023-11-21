const express = require('express');
const router = express.Router();

const test = require('../controllers/test.controller');

router.post('/term', test.setTerm);

module.exports = router;
