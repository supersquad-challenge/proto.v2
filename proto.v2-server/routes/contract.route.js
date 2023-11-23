const express = require('express');
const router = express.Router();

const contract = require('../controllers/contract.controller');

router.get('/', contract.test);

module.exports = router;
