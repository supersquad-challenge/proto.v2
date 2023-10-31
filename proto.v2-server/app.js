const express = require('express');
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

app.use(morgan('dev'));
// app.use(
//   morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms')
// );

//app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:3000'],
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
