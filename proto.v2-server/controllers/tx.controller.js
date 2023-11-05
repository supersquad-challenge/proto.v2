const UserChallenge = require('../models/userChallenge.model');
const ChallengeInfo = require('../models/challenge.model');

module.exports = {
  receiveDeposit: async (req, res) => {
    try {
      const txInfo = req.body;

      res.status(200).json({
        message: 'Crypto deposit received',
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
      const claimInfo = req.body;

      const userChallenge = await UserChallenge.findById(claimInfo.userChallengeId);

      if (!userChallenge) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      res.status(200).json({
        message: 'Payback provided',
        paybackInfo: {},
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
