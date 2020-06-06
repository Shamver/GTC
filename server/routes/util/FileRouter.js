const express = require('express');

const router = express.Router();

const async = require('../../middleware/async');

const { upload, uploadHandler } = require('../../middleware/photoUpload');

router.post('/images', upload.fields([{ name: 'upload' }]), uploadHandler, async(async (req, res) => {
  // ckeditor5 return success json 규격
  res.json({
    uploaded: true,
    url: req.photo.upload[0],
  });
}));

module.exports = router;
