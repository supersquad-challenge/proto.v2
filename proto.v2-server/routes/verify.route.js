const express = require('express');
const router = express.Router();

const verify = require('../controllers/verify.controller');

router.post('/postPhoto', verify.postPhoto);
router.post('/verifyPhoto', verify.verifyPhoto);
router.get('/allPhotoInfo/:userChallengeId', verify.getAllPhotos);
router.get('/:filename', verify.getPhotoByFilename);

module.exports = router;
