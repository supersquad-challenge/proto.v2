const express = require('express');
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');

const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

require('dotenv').config();

app.use(
  cookieSession({
    name: 'cookie-session',
    keys: [process.env.SESSION_SECRET],
    proxy: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month
  })
);

app.use(morgan('dev'));
// app.use(
//   morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms')
// );

// cookie-session 0.6.0 오류로 인해 추가
app.use(function (req, res, next) {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

//app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://proto-v2-client.vercel.app'],
    credentials: true,
  })
);

app.use('/', routes);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
  })
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('Unable to connect to MongoDB.', err));

module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
