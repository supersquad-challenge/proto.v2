const express = require('express');
const router = express.Router();

const user = require('./user.route');
const challenge = require('./challenge.route');
const tx = require('./tx.route');
const verify = require('./verify.route');
const myChallenge = require('./myChallenge.route');
const auth = require('./auth.route');
const contract = require('./contract.route');
const test = require('./test.route');

router.use('/user', user);
router.use('/challenge', challenge);
router.use('/myChallenge', myChallenge);
router.use('/tx', tx);
router.use('/verify', verify);
router.use('/auth', auth);
router.use('/contract', contract);
router.use('/test', test);

module.exports = router;
