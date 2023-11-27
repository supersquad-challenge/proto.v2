const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');
const uploadImage = require('../middleware/upload-s3');

router.post(
  '/nickname',
  (req, res, next) => uploadImage('userProfile', req, res, next),
  user.registerUserName
);
router.post('/address', user.registerAddress);
router.get('/detail/:userId', user.getUserInfo);
router.get('/all', user.getAllUsers);
router.post('/create', user.createUser);
router.delete('/clear/:userId', user.deleteUser);

module.exports = router;
