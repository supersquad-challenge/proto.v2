const moment = require('moment-timezone');
const ethers = require('ethers');

const path = require('path');

const VeriPhoto = require('../models/veriPhoto.model');
const UserChallenge = require('../models/userChallenge.model');

const dynamicPoolContractAbi =
  require('./../../proto.v2-contract/artifacts/contracts/dynamicpool/DynamicPool.sol/DynamicPool.json').abi;

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

const ServerPrivateKey = process.env.SERVER_PRIVATE_KEY;
const ServerWallet = new ethers.Wallet(ServerPrivateKey, provider);

module.exports = {
  postPhoto: async (req, res) => {
    try {
      const { userChallengeId } = req.body;
      if (!req.file) {
        return res.status(400).json({ error: 'Failed to upload file.' });
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const createdAtLocalTime = moment(Date.now()).tz(timezone).format('YYYY-MM-DD');
      console.log(timezone);

      const filter = {
        userChallengeId: userChallengeId,
        uploadedAt: createdAtLocalTime,
      };

      const update = {
        photoUrl: req.file.location,
        uploadedAt: createdAtLocalTime,
        checkedAt: null,
        checkStatus: 'notChecked',
        timezone: timezone,
        userChallengeId: userChallengeId,
      };

      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const veriPhoto = await VeriPhoto.findOneAndUpdate(filter, update, options);

      res.status(200).json({
        message: 'Photo uploaded',
        veriPhotoInfo: {
          veriPhotoId: veriPhoto._id,
          uploadedAt: veriPhoto.uploadedAt,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  verifyChallenge: async (req, res) => {
    try {
      const { userChallengeId, date, veriStatus } = req.body;

      const userChallenge = await UserChallenge.findById(userChallengeId).populate(
        'challengeId'
      );

      if (!userChallenge) {
        return res.status(404).json({
          error: 'userChallenge not found',
        });
      }

      if (veriStatus === 'success') {
      } else if (veriStatus === false) {
        userChallenge.completeNum = userChallenge.completeNum - 1;

        if (userChallenge.completeNum < 0) {
          userChallenge.completeNum = 0;
        }

        const checkSuccessRate =
          (userChallenge.completeNum / userChallenge.challengeId.totalVeriNum) * 100;

        const requiredCompleteNum = Math.floor(
          userChallenge.challengeId.totalVeriNum * 0.8
        );

        const slashDeposit = userChallenge.deposit / requiredCompleteNum;
        // slashDeposit 만큼 passPool 에서 failPool로 이동
        // slashDeposit 값을 Wei로 변환
        const slashDepositInWei = ethers.utils.parseEther(slashDeposit.toString());

        const successPoolAddress = userChallenge.challengeId.successPoolAddress;
        const failPoolAddress = userChallenge.challengeId.failPoolAddress;

        const successPoolContract = new ethers.Contract(
          successPoolAddress,
          dynamicPoolContractAbi,
          ServerWallet
        );

        const slashTx = await successPoolContract.transferTo(
          failPoolAddress,
          slashDepositInWei
        );
        const receipt = await createPool.wait();

        console.log(receipt);

        const updatedUserChallenge = await UserChallenge.findByIdAndUpdate(
          userChallengeId,
          {
            $set: {
              completeNum: userChallenge.completeNum,
              successRate: checkSuccessRate,
              profit: userChallenge.profit - slashDeposit,
              [`veriStatus.${date.toString()}`]: veriStatus,
            },
          },
          { new: true }
        );
      }

      const updatedUserChallenge = await UserChallenge.findByIdAndUpdate(
        userChallengeId,
        {
          $set: {
            [`veriStatus.${date.toString()}`]: veriStatus,
          },
        },
        { new: true }
      );

      res.status(200).json({
        message: 'Verification Photo updated',
        CheckedAdminInfo: {
          userChallengeId: updatedUserChallenge._id,
          successRate: updatedUserChallenge.successRate,
          completeNum: updatedUserChallenge.completeNum,
          profit: updatedUserChallenge.profit,
          veriStatus: updatedUserChallenge.veriStatus,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },

  getAllPhotos: async (req, res) => {
    try {
      const { userChallengeId } = req.params;

      const veriPhotoInfo = await VeriPhoto.find({
        userChallengeId: userChallengeId,
      });

      //console.log(verificationInfo);
      if (!veriPhotoInfo || veriPhotoInfo.length === 0) {
        return res.status(404).json({
          error: 'Verification Photo not found',
        });
      }

      res.status(200).json({
        message: 'Verification Photo found',
        veriPhotoInfo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getPhotoByFilename: async (req, res) => {
    try {
      const filename = req.params.filename;

      const filePath = path.join(__dirname, '../public/veriPhoto/', filename);

      if (fs.existsSync(filePath)) {
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'image/jpeg');
        fileStream.pipe(res);
      } else {
        res.status(404).json({ error: 'File not found.' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
