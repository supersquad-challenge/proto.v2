const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.model');

require('../controllers/auth.controller');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', {
    failureRedirect: '/',
    session: true,
  })(req, res, async () => {
    const userInfo = await User.findOne({ googleId: req.user.googleId });

    console.log(userInfo);
    if (userInfo.nickname) {
      // res.redirect('http://localhost:3000');
      res.redirect('https://v2.supersquad.store');
    } else {
      // res.redirect('http://localhost:3000/flow/nickname-setup');
      res.redirect('https://v2.supersquad.store/flow/nickname-setup');
    }
  });
});

router.get('/login', (req, res) => {
  //console.log(req.session.passport.user);
  if (req.user) {
    res.status(200).json({
      message: 'Login successful',
      userInfoId: req.user.id,
      email: req.user.email,
    });
  } else {
    res.status(401).json({
      error: 'Unauthorized',
    });
  }
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
