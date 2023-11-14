const moment = require('moment-timezone');
const path = require('path');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

require('dotenv').config();

const s3 = new aws.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
});

const uploadImage = (folderName, req, res, next) => {
  multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const filename = req.body.userChallengeId;
        const extension = path.extname(file.originalname);
        cb(null, `${folderName}/${filename}-${createdAtLocalTime}${extension}`);
      },
    }),
  }).single('file')(req, res, next);
};

const createdAtLocalTime = moment(Date.now())
  .tz('Asia/Seoul')
  .format('YYYY-MM-DD-HH:mm:ss');

module.exports = uploadImage;
