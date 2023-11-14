const express = require('express');
const router = express.Router();

const verify = require('../controllers/verify.controller');
const uploadImage = require('../middleware/upload-s3');

router.post(
  '/postPhoto',
  (req, res, next) => uploadImage('veriPhoto', req, res, next),
  verify.postPhoto
);
router.post('/verifyChallenge', verify.verifyChallenge);
// router.post('/verifyPhoto', verify.verifyPhoto);
router.get('/allPhotoInfo/:userChallengeId', verify.getAllPhotos);
router.get('/:filename', verify.getPhotoByFilename);

module.exports = router;
