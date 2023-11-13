const moment = require('moment-timezone');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const VeriPhoto = require('../models/veriPhoto.model');
const UserChallenge = require('../models/userChallenge.model');

require('dotenv').config();

const s3 = new aws.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const userChallengeId = req.body.userChallengeId;
      cb(null, `veriPhoto/${userChallengeId}-${createdAtLocalTime}`);
    },
  }),
});

const createdAtLocalTime = moment(Date.now())
  .tz('Asia/Seoul')
  .format('YYYY-MM-DD HH:mm:ss');

module.exports = {
  postPhoto: async (req, res) => {
    try {
      const { userChallengeId } = req.body;

      uploadImage.single('veriPhoto')(req, res, async (err) => {
        // console.log(req.file);
        if (err || !req.file) {
          console.log(err);
          return res.status(400).json({ error: 'Failed to upload file.' });
        }

        const veriPhoto = await VeriPhoto.create({
          photoUrl: req.file.location,
          uploadedAt: createdAtLocalTime,
          checkedAt: null,
          checkStatus: 'notChecked',
          userChallengeId: userChallengeId,
        });

        res.status(200).json({
          message: 'Photo uploaded',
          veriPhotoInfo: {
            veriPhotoId: veriPhoto._id,
            uploadedAt: veriPhoto.uploadedAt,
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
        // slashDeposit 만큼 passPool 에서 failPool로 이동 구현필요

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
