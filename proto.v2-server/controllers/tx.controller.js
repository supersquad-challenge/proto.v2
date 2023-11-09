const UserChallenge = require('../models/userChallenge.model');
const ChallengeInfo = require('../models/challenge.model');

module.exports = {
  DepositPool: async (req, res) => {
    try {
      const { userChallengeId, deposit } = req.body;

      const userChallengeInfo = await UserChallenge.findById(userChallengeId).populate(
        'challengeId'
      );

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      userChallengeInfo.depositMethod = 'crypto';
      userChallengeInfo.deposit = deposit;
      userChallengeInfo.save();

      userChallengeInfo.challengeId.cryptoSuccessPool += deposit;
      userChallengeInfo.challengeId.participants += 1;
      userChallengeInfo.challengeId.save();

      res.status(200).json({
        message: 'Crypto deposit received',
        depositInfo: {
          userChallengeId: userChallengeInfo._id,
          depositMethod: userChallengeInfo.depositMethod,
          deposit: userChallengeInfo.deposit,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  providePayback: async (req, res) => {
    try {
      const { userChallengeId } = req.body;

      const userChallenge = await UserChallenge.findById(userChallengeId).populate(
        'challengeId'
      );

      if (!userChallenge) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      res.status(200).json({
        message: 'Payback provided',
        paybackInfo: {
          successRate: userChallenge.successRate,
          totalPayback: userChallenge.deposit + userChallenge.profit,
          myDeposit: userChallenge.deposit,
          myProfit: userChallenge.profit,
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
