const express = require('express');
const router = express.Router();

const challenge = require('../controllers/challenge.controller');

router.get('/', challenge.getChallengeAll);
router.get('/user/:userChallengeId', challenge.getChallengeByUserChallengeId);
router.get('/:challengeId', challenge.getChallengeById);
router.post('/create', challenge.createChallenge);
router.delete('/delete/:challengeId', challenge.deleteChallengeById);

module.exports = router;
