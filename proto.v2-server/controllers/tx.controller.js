const UserChallenge = require('../models/userChallenge.model');
const ChallengeInfo = require('../models/challenge.model');

module.exports = {
  DepositPool: async (req, res) => {
    try {
      const { userChallengeId, depositMethod, deposit } = req.body;

      const userChallengeInfo = await UserChallenge.findById(userChallengeId).populate(
        'challengeId'
      );

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      userChallengeInfo.depositMethod = depositMethod;
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

      const challengeInfo = await ChallengeInfo.findByIdAndUpdate(
        userChallenge.challengeId._id,
        { $inc: { cryptoSuccessPool: -userChallenge.deposit, participants: -1 } },
        { new: true }
      );

      const updatedUserChallenge = await UserChallenge.findByIdAndUpdate(
        userChallengeId,
        { $set: { isPaybackPaid: true } },
        { new: true }
      );

      res.status(200).json({
        message: 'Payback provided',
        paybackInfo: {
          successRate: updatedUserChallenge.successRate,
          totalPayback: updatedUserChallenge.deposit + userChallenge.profit,
          myDeposit: updatedUserChallenge.deposit,
          myProfit: updatedUserChallenge.profit,
          isPaybackPaid: updatedUserChallenge.isPaybackPaid,
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
