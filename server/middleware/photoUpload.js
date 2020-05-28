import multer from 'multer';
import gm from 'gm';
import mkdirp from 'mkdirp';
import path from 'path';
import randToken from 'rand-token';
import fs from 'fs';

import s3UploadFile from './s3';
import async from './async';
import { upload as uploadConfig } from '../../../config';

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
export const publicPath = uploadConfig.directoryPublic;
export const uploadPath = path.resolve(__dirname, '../../../', uploadConfig.directory);
mkdirp.sync(uploadPath);
// Init multer
export const upload = multer({
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

export const nextHandler = async(async (req, res, next) => next());
export const uploadHandler = async(async (req, res, next) => {
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

export default function (req, res, next) {
  return photoUpload(req, res, (err) => {
    if (req.body.type === 'Image') {
      console.log('photoUpload Start');
      if (err) next(err);
      else uploadHandler(req, res, next);
    } else nextHandler(req, res, next);
  });
}
