const s3 = require('@faceleg/s3');
const AWS = require('aws-sdk');
const fs = require('fs');
const { s3Config } = require('../config');

const awsS3Client = s3Config.enabled && new AWS.S3(s3Config);
const client = s3Config.enabled && s3.createClient({
  s3Client: awsS3Client,
});
const s3UploadFile = (key, path, publicPath, contentType) => {
  return new Promise((resolve, reject) => {
    // Don't use S3 if not enabled
    if (!s3Config.enabled) return resolve(publicPath);
    const uploader = client.uploadFile({
      localFile: path,
      s3Params: {
        Bucket: s3Config.bucket,
        Key: key,
        ACL: 'public-read',
        ContentType: contentType,
      },
    });
    uploader.on('error', (err) => {
      console.log(err);
      reject(err);
    });
    uploader.on('end', () => {
      // Unlink file from the local filesystem. But, since the result doesn't
      // matter at all, use no-op callback
      fs.unlink(path, (err) => {
        if (err) console.log(err);
      });
      console.log(`Uploaded ${key}`);
      resolve(s3.getPublicUrlHttp(s3Config.bucket, key));
    });
  });
};

module.exports = {
  client,
  s3UploadFile,
};
