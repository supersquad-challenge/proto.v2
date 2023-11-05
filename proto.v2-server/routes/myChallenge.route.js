const express = require('express');
const router = express.Router();

const myChallenge = require('../controllers/myChallenge.controller');

router.post('/register', myChallenge.registerMyChallenge);
router.get('/allMychallenge/:userId', myChallenge.getAllMychallenge);
router.get('/myStatus/:userChallengeId', myChallenge.getMyStatus);
router.get('/payback/:userChallengeId', myChallenge.getPayback);
router.get('/verifyPhoto/:userChallengeId', myChallenge.getVerifyPhoto);

module.exports = router;
