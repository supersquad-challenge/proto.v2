const moment = require('moment-timezone');

const Challenge = require('../models/challenge.model');
const UserChallenge = require('../models/userChallenge.model');

module.exports = {
  getChallengeAll: async (req, res) => {
    try {
      const challengeInfo = await Challenge.find({});

      if (challengeInfo.length === 0) {
        return res.status(404).json({
          error: 'Challenge not found',
        });
      }

      res.status(200).json({
        message: 'Challenge found',
        challengeInfo: challengeInfo
          .map((challengeInfo) => ({
            challengeId: challengeInfo._id,
            category: challengeInfo.category,
            name: challengeInfo.name,
            thumbnailUrl: challengeInfo.thumbnailUrl,
            participants: challengeInfo.participants,
          }))
          .reverse(),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },

  getChallengeById: async (req, res) => {
    try {
      const { challengeId } = req.params;
      const challengeInfo = await Challenge.findById(challengeId);

      if (!challengeInfo) {
        return res.status(404).json({
          error: 'Challenge not found',
        });
      }

      res.status(200).json({
        message: 'Challenge found',
        challengeInfo: {
          challengeId: challengeInfo._id,
          name: challengeInfo.name,
          thumbnailUrl: challengeInfo.thumbnailUrl,
          participants: challengeInfo.participants,
          frequency: challengeInfo.frequency,
          howTo: challengeInfo.howTo,
          description: challengeInfo.description,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getChallengeByUserChallengeId: async (req, res) => {
    try {
      const { userChallengeId } = req.params;

      const userChallengeInfo = await UserChallenge.findById(userChallengeId).populate(
        'challengeId'
      );
      //console.log(userChallengeInfo);

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'Challenge not found',
        });
      }

      res.status(200).json({
        message: 'Challenge found',
        userChallengeInfo: {
          userChallengeId: userChallengeInfo._id,
          challengeId: userChallengeInfo.challengeId._id,
          category: userChallengeInfo.challengeId.category,
          name: userChallengeInfo.challengeId.name,
          thumbnailUrl: userChallengeInfo.challengeId.thumbnailUrl,
          frequency: userChallengeInfo.challengeId.frequency,
          status: userChallengeInfo.status,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },

  createChallenge: async (req, res) => {
    try {
      const challenge = req.body;

      const challengeInfo = await Challenge.findOne({
        name: challenge.challengeName,
      });

      if (challengeInfo) {
        return res.status(400).json({
          error: 'Challenge already exists',
        });
      }

      const createdAtLocalTime = moment(Date.now())
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD HH:mm:ss');

      const challengeData = await Challenge.create({
        ...challenge,
        createdAt: createdAtLocalTime,
      });

      res.status(200).json({
        message: 'Challenge created',
        challengeInfo: {
          challengeId: challengeData._id,
          name: challengeData.name,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  deleteChallengeById: async (req, res) => {
    try {
      const { challengeId } = req.params;

      const challengeInfo = await Challenge.findByIdAndDelete(challengeId);

      if (!challengeInfo) {
        return res.status(404).json({
          error: 'Challenge not found',
        });
      }

      res.status(200).json({
        message: 'Challenge deleted',
        challengeInfo: {
          challengeId: challengeInfo._id,
          challengeName: challengeInfo.challengeName,
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
