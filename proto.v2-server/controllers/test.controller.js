const UserChallenge = require('../models/userChallenge.model');

module.exports = {
  setTerm: async (req, res) => {
    try {
      const { userChallengeId, challengeStartAt, challengeEndAt, isPaybackPaid } =
        req.body;

      const userChallengeInfo = await UserChallenge.findByIdAndUpdate(
        userChallengeId,
        {
          challengeStartAt,
          challengeEndAt,
          isPaybackPaid,
        },
        { new: true }
      );

      if (!userChallengeInfo) {
        return res.status(404).json({
          error: 'User Challenge not found',
        });
      }

      res.status(200).json({
        message: 'Crypto deposit received',
        userChallengeInfo: {
          userChallengeId: userChallengeInfo._id,
          challengeStartAt: userChallengeInfo.challengeStartAt,
          challengeEndAt: userChallengeInfo.challengeEndAt,
          isPaybackPaid: userChallengeInfo.isPaybackPaid,
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
