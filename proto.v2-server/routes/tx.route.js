const express = require('express');
const router = express.Router();

const tx = require('../controllers/tx.controller');

router.post('/deposit', tx.receiveDeposit);
router.post('/claim', tx.providePayback);

module.exports = router;
