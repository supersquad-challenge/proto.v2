var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  category: String, //Diet, Fitness, Mental Health, Habit
  name: {
    type: String,
    unique: true,
  },
  thumbnailUrl: String,
  frequency: String,
  totalVeriNum: Number,
  participants: Number,
  veriMethod: String, //photo
  cashSuccessPool: Number,
  cashFailPool: Number,
  cryptoSuccessPool: Number,
  cryptoFailPool: Number,
  howTo: String,
  description: String,
  SuccessPoolAddress: String,
	FailPoolAddress: String,
  createdAt: String,
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
