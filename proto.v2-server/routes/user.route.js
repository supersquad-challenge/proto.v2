const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.post('/nickname', user.registerUserName);
router.post('/address', user.registerAddress);
router.get('/detail/:userId', user.getUserInfo);
router.get('/all', user.getAllUsers);
router.post('/create', user.createUser);

module.exports = router;
