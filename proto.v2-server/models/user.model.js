var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  nickname: String,
  picture: String,
  isCookieAllowed: Boolean,
  level: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
