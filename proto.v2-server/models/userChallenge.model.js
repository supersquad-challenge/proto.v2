var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserChallengeSchema = new Schema({
  challengeStartAt: String,
  challengeEndAt: String,
  status: String, //ongoing, complete, canceled
  depositMethod: String, //cash, crypto
  deposit: Number,
  completeNum: Number,
  successRate: Number,
  successStatus: String, //success, fail ; badge
  cashPayback: Number,
  cryptoPayback: Number,
  profit: Number,
  veriStatus: {
    type: Schema.Types.Mixed,
  },
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('UserChallenge', UserChallengeSchema);
