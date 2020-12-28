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
    const params = {
      url: req.file.location,
      imageKey: req.file.key,
      user_id: req.user.id,
      designed_by: req.body.designedBy,
      folded_by: req.body.foldedBy,
      category: req.body.category,
      model: req.body.model,
      difficulty: req.body.difficulty,
    }
    Images.create(params, (result, err) => {
      if (err)
        return res.json(err);
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

router.get('/all-images/:lastDateTime', (req, res) => {
  const lastDateTime = req.params.lastDateTime;

  Images.getAllImages(lastDateTime, (images, err) => {
    if (err) {
      return res.json(err);
    }
    return res.json(images);
  })
});

router.post('/delete-image', (req, res) => {
  var imageId = req.body.imageId;
  var userId = req.body.userId;
  var key = req.body.imageKey;

  if (userId !== req.user.id)
      return res.status(400).send({error: "Please login to delete this image"});
  S3.delete(key, (result, err) => {
    if (err) {
      return res.json(err);
    }
    Images.deleteImage(imageId, (images, err) => {
      if (err) {
        return res.json(err);
      }
      return res.json(images);
    })
  })
});

router.post('/image-delete', (req, res) => {
  var key = req.body.key;

  S3.delete(key, (result, err) => {
    if (err) {
      return res.json(err);
    }
    return res.json(result);
  })
});

module.exports = router;