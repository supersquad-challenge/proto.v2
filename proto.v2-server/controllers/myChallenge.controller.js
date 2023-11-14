const moment = require('moment-timezone');

const ChallengeInfo = require('../models/challenge.model');
const UserChallenge = require('../models/userChallenge.model');
const User = require('../models/user.model');
const VeriPhoto = require('../models/veriPhoto.model');

module.exports = {
  registerMyChallenge: async (req, res) => {
    try {
      const { userId, challengeId } = req.body;

      const userChallenge = await UserChallenge.findOne({
        userId,
        challengeId,
      });

      console.log(userChallenge);

      if (userChallenge) {
        return res.status(409).json({
          error: 'My challenge already registered',
        });
      }

      const challengeInfo = await ChallengeInfo.findById(challengeId);

      if (!challengeInfo) {
        return res.status(404).json({
          error: 'Challenge not found',
        });
      }

      const userInfo = await User.findById(userId);

      const localtime = moment().tz(userInfo.timezone).format('YYYY-MM-DD-HH:mm:ss');
      const endtime = moment()
        .tz(userInfo.timezone)
        .add(14, 'days')
        .format('YYYY-MM-DD-HH:mm:ss');

      const userChallengeInfo = await UserChallenge.create({
        challengeStartAt: localtime,
        challengeEndAt: endtime, //2 weeks
        status: 'ongoing',
        deposit: 0,
        completeNum: 14,
        successRate: 100,
        successStatus: false,
        cashPayback: 0,
        cryptoPayback: 0,
        profit: 0,
        userId: userId,
        challengeId: challengeId,
      });

      const allUserChallengeInfo = await UserChallenge.find({ userId }).populate(
        'challengeId'
      );

      res.status(200).json({
        message: 'My challenge registered',
        userChallengeId: userChallengeInfo._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getAllMychallenge: async (req, res) => {
    try {
      const { userId } = req.params;

      const allUserChallengeInfo = await UserChallenge.find({ userId }).populate(
        'challengeId'
      );

      if (allUserChallengeInfo.length === 0) {
        return res.status(404).json({
          error: 'My challenge not found',
        });
      }

      res.status(200).json({
        message: 'My challenge found',
        userChallengeInfo: {
          allUserChallengeInfo: allUserChallengeInfo
            .map((userChallengeInfo) => ({
              userChallengeId: userChallengeInfo._id,
              challengeId: userChallengeInfo.challengeId._id,
              status: userChallengeInfo.status,
              category: userChallengeInfo.challengeId.category,
              name: userChallengeInfo.challengeId.name,
              thumbnailUrl: userChallengeInfo.challengeId.thumbnailUrl,
              challengeStartAt: userChallengeInfo.challengeStartAt,
              challengeEndAt: userChallengeInfo.challengeEndAt,
            }))
            .reverse(),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getMyStatus: async (req, res) => {
    try {
      const { userChallengeId } = req.params;

      const userChallengeInfo = await UserChallenge.findById(userChallengeId).populate(
        'challengeId'
      );

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      const totalCryptoDeposit =
        userChallengeInfo.challengeId.cryptoSuccessPool +
        userChallengeInfo.challengeId.cryptoFailPool;

      const myStatus = {
        thumbnailUrl: userChallengeInfo.challengeId.thumbnailUrl,
        name: userChallengeInfo.challengeId.name,
        participants: userChallengeInfo.challengeId.participants,
        successRate: userChallengeInfo.successRate,
        depositMethod: userChallengeInfo.depositMethod,
        deposit: userChallengeInfo.deposit,
        totalDeposit: totalCryptoDeposit,
        cryptoSuccessPool: userChallengeInfo.challengeId.cryptoSuccessPool,
        cryptoFailPool: userChallengeInfo.challengeId.cryptoFailPool,
        challengeStartAt: userChallengeInfo.challengeStartAt,
        challengeEndAt: userChallengeInfo.challengeEndAt,
      };

      res.status(200).json({
        message: 'My status found',
        myStatus,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getPayback: async (req, res) => {
    try {
      const { userChallengeId } = req.params;

      const userChallengeInfo = await UserChallenge.findById(userChallengeId);

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      res.status(200).json({
        message: 'Payback found',
        paybackInfo: {
          totalPayback: userChallengeInfo.deposit + userChallengeInfo.profit,
          deposit: userChallengeInfo.deposit,
          depositMethod: userChallengeInfo.depositMethod,
          profit: userChallengeInfo.profit,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getVerifyPhoto: async (req, res) => {
    try {
      const { userChallengeId } = req.params;

      const veriPhoto = await VeriPhoto.find({ userChallengeId }).populate(
        'userChallengeId'
      );

      if (veriPhoto.length === 0) {
        return res.status(404).json({
          error: 'Verification Photo not found',
        });
      }

      const userInfo = await User.findById(veriPhoto[0].userChallengeId.userId);

      const currentDate = moment().tz(userInfo.timezone).format('YYYY-MM-DD');

      const uploadedPhotos = veriPhoto.filter((photo) => {
        const createdAtDate = moment(photo.uploadedAt).format('YYYY-MM-DD');
        return createdAtDate === currentDate;
      });

      if (uploadedPhotos.length === 0) {
        return res.status(404).json({
          error: 'Verification Photo not found',
        });
      }

      const veriPhotoIds = uploadedPhotos.map((photo) => photo._id);

      res.status(200).json({
        message: 'Verification Photo found',
        veriPhotoIds: veriPhotoIds,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  deleteUserChallengeById: async (req, res) => {
    try {
      const { userChallengeId } = req.params;

      const userChallengeInfo = await UserChallenge.findByIdAndDelete(userChallengeId);

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      res.status(200).json({
        message: 'User Challenge deleted',
        userChallengeInfo: {
          userChallengeId: userChallengeInfo._id,
          challengeId: userChallengeInfo.challengeId,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
