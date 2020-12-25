var express = require('express');
var S3 = require('../services/s3');
var Images = require('../models/images');
require('dotenv').config();

var router = express.Router();

const singleUpload = S3.upload.single('image');

router.post('/image-upload', (req, res) => {
  if (process.env.DEV_USER !== 'dev') {
    if (!req.userContext)
      return res.status(400).send({error: "Please login to create a post"});
  }

  singleUpload(req, res, (err) => {
    if (err)
      return res.json({error: err.message});

    const url = req.file.location;
    const user_id = req.user.id;
    const author = req.body.author;
    Images.create(url, user_id, author, (result, err) => {
      if (err) {
        return res.json(err);
      }
      return res.json({'fileUrl': req.file.location})
    })
  })
});

router.get('/user-images', (req, res) => {
  if (process.env.DEV_USER !== 'dev') {
    if (!req.userContext)
      return res.status(400).send({error: "Please login to view user images"});
  }
  const user_id = req.user.id;
  Images.getUserImages(user_id, (images, err) => {
    if (err) {
      return res.json(err);
    }
    return res.json(images);
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