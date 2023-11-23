const express = require('express');
const router = express.Router();

const challenge = require('../controllers/challenge.controller');
const uploadImage = require('../middleware/upload-s3');

router.get('/', challenge.getChallengeAll);
router.get('/user/:userChallengeId', challenge.getChallengeByUserChallengeId);
router.get('/:challengeId', challenge.getChallengeById);
router.post(
  '/create',
  (req, res, next) => uploadImage('challengeThumbnail', req, res, next),
  challenge.createChallenge
);
router.delete('/delete/:challengeId', challenge.deleteChallengeById);

module.exports = router;
