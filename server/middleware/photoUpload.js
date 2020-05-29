const multer = require('multer');
const gm = require('gm');
const mkdirp = require('mkdirp');
const path = require('path');
const randToken = require('rand-token');
const fs = require('fs');

const s3UploadFile = require('./s3');
const async = require('./async');
const { uploadConfig } = require('../config');

function writeGM(gmObject, filename) {
  const filePath = path.resolve(uploadConfig.directory, filename);
  const publicPath = path.resolve(uploadConfig.directoryPublic, filename);
  return new Promise((resolve, reject) => gmObject.write(filePath, (err) => {
    if (err) {
      console.log(err);
      return reject('PhotoInvalid');
    }
    resolve();
  })).then(() =>
    // Upload the file to S3 bucket.
    s3UploadFile(`images/${filename}`, filePath, uploadConfig.url + publicPath));
}

// Create upload path first
const uploadPath = path.resolve(__dirname, '../../../', uploadConfig.directory);
mkdirp.sync(uploadPath);
// Init multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadConfig.directory),
    filename: (req, file, cb) => {
      console.log(req.body);
      cb(null, randToken.generate(32));
    },
  }),
  limits: {
    // Allow up to 50MB
    fileSize: 1024 * 1024 * 50,
  },
});

const photoUpload = upload.fields(['photo']);
const nextHandler = async(async (req, res, next) => next());
const uploadHandler = async(async (req, res, next) => {
  // Process each file with graphicsmagick
  function createPromise(file) {
    const fileName = randToken.generate(32);
    return Promise.all([
      writeGM(gm(file.path).flatten().autoOrient().resize(1280, 1280, '>')
        .noProfile(), `${fileName}.jpg`),
      writeGM(gm(file.path).flatten().autoOrient().resize(256, 256, '>')
        .noProfile(), `${fileName}.thumb.jpg`),
    ]).then((v) => {
      // Remove temporary file even if it has failed
      fs.unlink(file.path, (err) => { if (err) console.log(err); });
      return v[0];
    }, (v) => {
      fs.unlink(file.path, (err) => { if (err) console.log(err); });
      throw v;
    });
  }
  if (Array.isArray(req.files)) {
    req.photo = await Promise.all(req.files.map(createPromise));
  } else if (req.files != null) {
    // A little more complicated for objects...
    let promises = [];
    req.photo = {};
    for (const key in req.files) {
      req.photo[key] = [];
      promises = promises.concat(req.files[key].map(
        (file, i) => createPromise(file).then((url) => req.photo[key][i] = url),
      ));
    }
    await Promise.all(promises);
  }
  next();
});
exports.publicPath = uploadConfig.directoryPublic;
exports.uploadPath = uploadPath;
exports.nextHandler = nextHandler;
exports.uploadHandler = uploadHandler;
exports.upload = upload;
module.exports = function (req, res, next) {
  return photoUpload(req, res, (err) => {
    if (req.body.type === 'Image') {
      console.log('photoUpload Start');
      if (err) next(err);
      else uploadHandler(req, res, next);
    } else nextHandler(req, res, next);
  });
};
