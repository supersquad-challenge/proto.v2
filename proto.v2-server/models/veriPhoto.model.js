var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const VeriPhotoSchema = new Schema({
  photoUrl: String,
  uploadedAt: String,
  checkedAt: String,
  checkStatus: String, //pending, approved, rejected
  userChallengeId: {
    type: Schema.Types.ObjectId,
    ref: 'UserChallenge',
  },
});

module.exports = mongoose.model('VeriPhoto', VeriPhotoSchema);
