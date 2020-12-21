var express = require('express');
var S3 = require('../services/s3');

var router = express.Router();

const singleUpload = S3.upload.single('image');

router.post('/image-upload', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err)
      return res.json({error: err.message});
    return res.json({'fileUrl': req.file.location})
  })
});

router.post('/image-delete', (req, res) => {
  var key = req.body.key;

  S3.delete(key, (err, result) => {
    if (err) {
      return res.json(err);
    }
    return res.json(result);
  })
});

module.exports = router;