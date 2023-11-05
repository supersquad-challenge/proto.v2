var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  nickname: String,
  profileUrl: String,
  timezone: String,
  points: Number,
  wallet: String,
  badge: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
