const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

require('dotenv').config();

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log('deserializeUser');

    done(null, user);
  } catch (err) {
    done(err);
  }
});

const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    // callbackURL: 'https://supersquad.site/auth/google/callback',
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        email: profile.emails[0].value,
        googleId: profile.id,
        name: profile.displayName,
        profileUrl: profile.photos[0].value,
        locale: profile._json.locale,
        timezone: null,
      });
      const user = await newUser.save();
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

passport.use('google', googleStrategyConfig);
