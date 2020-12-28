const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const BUCKET_NAME = 'image-repository-2020';
const REGION = 'us-east-2';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: REGION
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb (null, true);
  } else {
    cb (new Error('Invalid Mime Type, only accepts JPEG, JPG and PNG'), false);
  }
}

class S3 {
  static upload = multer({
    fileFilter,
    storage: multerS3({
      s3,
      bucket: BUCKET_NAME,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, {fieldName: 'TESTING META DATA'});
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString())
      }
    })
  })

  static delete(key, callback) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key
    }
    s3.deleteObject(params, (err, data) => {
      if (err)
        return callback(null, err);  // error
      callback(data);              // deleted
    });
  }
}

module.exports = S3;