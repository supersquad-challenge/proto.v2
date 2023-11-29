const moment = require('moment-timezone');
const ethers = require('ethers');

const Challenge = require('../models/challenge.model');
const UserChallenge = require('../models/userChallenge.model');

const poolFactoryContractAbi =
  require('./../../proto.v2-contract/artifacts/contracts/dynamicpool/factory/DynamicPoolFactory.sol/DynamicPoolFactory.json').abi;

require('dotenv').config();

// const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const provider = new ethers.providers.JsonRpcProvider(process.env.KLAYTN_URL);

const ServerPrivateKey = process.env.SERVER_PRIVATE_KEY;
const ServerWallet = new ethers.Wallet(ServerPrivateKey, provider);

const poolFactoryAddress = process.env.POOL_FACTORY_CONTRACT_ADDRESS;

const poolFactoryContract = new ethers.Contract(
  poolFactoryAddress,
  poolFactoryContractAbi,
  ServerWallet
);

module.exports = {
  getChallengeAll: async (req, res) => {
    try {
      const category = req.query.category;

      let challengeInfo;

      if (category) {
        challengeInfo = await Challenge.find({ category });
      } else {
        challengeInfo = await Challenge.find();
      }

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

      const userChallengeInfo = await UserChallenge.find({
        challengeId: challengeId,
      }).populate('userId');

      const profileUrls = userChallengeInfo
        .filter((userChallenge) => userChallenge.userId)
        .map((userChallenge) => userChallenge.userId.profileUrl);

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
          category: challengeInfo.category,
          profileUrls: profileUrls,
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
      if (!req.file) {
        return res.status(400).json({ error: 'Failed to upload file.' });
      }

      const challenge = req.body;

      const challengeInfo = await Challenge.findOne({
        name: challenge.name,
      });

      if (challengeInfo) {
        return res.status(400).json({
          error: 'Challenge already exists',
        });
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const createdAtLocalTime = moment(Date.now())
        .tz(timezone)
        .format('YYYY-MM-DD-HH:mm:ss');

      const createPool = await poolFactoryContract.createChallenge(challenge.name);
      const receipt = await createPool.wait();

      const idx = await poolFactoryContract.getIndex();
      const address = await poolFactoryContract.getChallenge(idx);

      const challengeData = await Challenge.create({
        ...challenge,
        thumbnailUrl: req.file.location,
        successPoolAddress: address[0],
        failPoolAddress: address[1],
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
