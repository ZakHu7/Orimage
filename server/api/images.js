var express = require('express');
var S3 = require('../services/s3');
var Images = require('../models/images');

var router = express.Router();

const singleUpload = S3.upload.single('image');

router.post('/image-upload', (req, res) => {
  if (!req.userContext)
    return res.status(400).send({error: "You are not logged in"});

  // var author = req.body.author;
  // if (!author)
  //   return res.status(400).json({error: "Author was not found"});

  singleUpload(req, res, (err) => {
    if (err)
      return res.json({error: err.message});

    const url = req.file.location;
    const user_id = req.user.id;
    const author = req.body.author;
    Images.insert(url, user_id, author, (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.json({'fileUrl': req.file.location})
    })
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