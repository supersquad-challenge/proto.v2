const express = require('express');
const router = express.Router();

const user = require('./user.route');
const challenge = require('./challenge.route');
const tx = require('./tx.route');
const verify = require('./verify.route');
const myChallenge = require('./myChallenge.route');
const auth = require('./auth.route');

router.use('/user', user);
router.use('/challenge', challenge);
router.use('/myChallenge', myChallenge);
router.use('/tx', tx);
router.use('/verify', verify);
router.use('/auth', auth);

module.exports = router;
