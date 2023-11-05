const multer = require('multer');
const fs = require('fs');
const path = require('path');

const moment = require('moment-timezone');

const VerificationPhoto = require('../models/veriPhoto.model');
const UserChallenge = require('../models/userChallenge.model');
const ChallengeInfo = require('../models/challenge.model');

// diskStorages
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/veriPhoto/');
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const timestamp = `${year}${month}${day}-${hours}${minutes}${seconds}`;
    cb(null, file.fieldname + '-' + timestamp);
  },
});

const upload = multer({ storage: storage });

const createdAtLocalTime = moment(Date.now())
  .tz('Asia/Seoul')
  .format('YYYY-MM-DD HH:mm:ss');

module.exports = {
  postPhoto: async (req, res) => {
    try {
      upload.single('veriPhoto')(req, res, async (err) => {
        if (err || !req.file) {
          //console.log(err);
          return res.status(400).json({ error: 'Failed to upload file.' });
        }
        const veriPhotoInfo = req.file;
        const userChallengeId = req.body.userChallengeId;

        const verificationPhoto = await VerificationPhoto.create({
          verificationPhoto: veriPhotoInfo.path,
          uploadedAt: createdAtLocalTime,
          adminCheckedAt: null,
          adminCheckStatus: 'notChecked',
          userChallenge_id: userChallengeId,
        });

        res.status(200).json({
          message: 'Photo uploaded',
          verificationPhotoInfo: {
            verificationPhotoId: verificationPhoto._id,
            uploadedAt: verificationPhoto.uploadedAt,
          },
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  verifyPhoto: async (req, res) => {
    try {
      const verificationInfo = req.body;
      //console.log(verificationInfo);

      const verificationPhoto = await VerificationPhoto.findById(
        verificationInfo.verificationPhotoId
      );

      if (!verificationPhoto) {
        return res.status(404).json({
          error: 'Verification Photo not found',
        });
      }

      if (verificationPhoto.adminCheckStatus !== 'notChecked') {
        return res.status(400).json({
          error: 'Verification Photo already checked',
        });
      }

      const updatedVerificationPhoto = await VerificationPhoto.findByIdAndUpdate(
        verificationInfo.verificationPhotoId,
        {
          adminCheckedAt: Date.now(),
          adminCheckStatus: verificationInfo.adminCheckStatus,
        },
        { new: true }
      );

      const userChallenge = await UserChallenge.findById(
        verificationPhoto.userChallenge_id
      );

      const challengeInfo = await ChallengeInfo.findById(userChallenge.challenge_id);

      let status;
      if (verificationInfo.adminCheckStatus === 'approved') {
        status = true;
      } else if (verificationInfo.adminCheckStatus === 'rejected') {
        status = false;
        userChallenge.completeNum = userChallenge.completeNum - 1;
        if (userChallenge.completeNum < 0) {
          userChallenge.completeNum = 0;
        }
      } else {
        return res.status(400).json({
          error: 'Wrong adminCheckStatus',
        });
      }

      const checkSuccessRate =
        (userChallenge.completeNum / challengeInfo.challengeTotalVerificationNum) * 100;

      const slashDeposit =
        userChallenge.deposit / challengeInfo.challengeRequiredCompleteNum;

      let slashCryptoFail = 0,
        slashCashFail = 0;
      // 성공률 % 기준
      if (checkSuccessRate < 80) {
        if (userChallenge.depositMethod === 'crypto') {
          slashCryptoFail = challengeInfo.cryptoFailPool + slashDeposit;

          if (slashCryptoFail > userChallenge.deposit) {
            slashCryptoFail = userChallenge.deposit;
          }

          const updatedChallengeInfo = await ChallengeInfo.findByIdAndUpdate(
            userChallenge.challenge_id,
            {
              $set: {
                cryptoFailPool: slashCryptoFail,
                cryptoSuccessPool: challengeInfo.challengeCryptoDeposit - slashCryptoFail,
              },
            },
            { new: true }
          );
        } else if (userChallenge.depositMethod === 'cash') {
          slashCashFail = challengeInfo.cashFailPool + slashDeposit;

          if (slashCashFail > userChallenge.deposit) {
            slashCashFail = userChallenge.deposit;
          }

          const updatedChallengeInfo = await ChallengeInfo.findByIdAndUpdate(
            userChallenge.challenge_id,
            {
              $set: {
                cashFailPool: slashCashFail,
                cashSuccessPool: challengeInfo.challengeCashDeposit - slashCashFail,
              },
            },
            { new: true }
          );
        }
      }

      const updatedUserChallenge = await UserChallenge.findByIdAndUpdate(
        verificationPhoto.userChallenge_id,
        {
          $set: {
            [`verificationStatus.${verificationInfo.date.toString()}`]: status,
            completeNum: userChallenge.completeNum,
            successRate: checkSuccessRate,
          },
        },
        { new: true }
      );

      res.status(200).json({
        message: 'Verification Photo updated',
        CheckedAdminInfo: {
          adminCheckStatus: updatedVerificationPhoto.adminCheckStatus,
          adminCheckedAt: updatedVerificationPhoto.adminCheckedAt,
          userChallengeId: updatedVerificationPhoto.userChallenge_id,
          successRate: updatedUserChallenge.successRate,
          verificationStatus: updatedUserChallenge.verificationStatus,
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
      const userChallengeId = req.params.userChallengeId;

      const verificationInfo = await VerificationPhoto.find({
        userChallenge_id: userChallengeId,
      });

      //console.log(verificationInfo);
      if (!verificationInfo || verificationInfo.length === 0) {
        return res.status(404).json({
          error: 'Verification Photo not found',
        });
      }

      res.status(200).json({
        message: 'Verification Photo found',
        verificationInfo: verificationInfo,
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
