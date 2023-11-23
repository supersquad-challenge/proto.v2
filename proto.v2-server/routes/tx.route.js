const express = require('express');
const router = express.Router();

const tx = require('../controllers/tx.controller');

router.post('/deposit', tx.DepositPool);
router.post('/claim', tx.providePayback);

module.exports = router;
