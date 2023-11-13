const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../controllers/auth.controller');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    // successReturnToOrRedirect: 'https://proto.supersquad.site/home',
    successReturnToOrRedirect: 'http://localhost:3000',
    failureRedirect: '/',
    session: true,
  })
);

router.get('/login', (req, res) => {
  //console.log(req.session.passport.user);
  res.status(200).json({
    message: 'Login successful',
    userInfoId: req.user.id,
    email: req.user.email,
  });
});

router.post('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      message: 'Logout successful',
    });
  });
});

module.exports = router;
