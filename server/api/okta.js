var express = require('express');
require('dotenv').config();

var router = express.Router();

router.get('/login', (req, res) => {
  return res.status(200).json({
    success: true,
    redirectUrl: `${process.env.HOST_URL}/login`
  })
});

router.post('/logout', (req, res) => {
  return res.status(200).json({
    success: true,
    redirectUrl: `${process.env.HOST_URL}/logout`
  })
});


router.get('/loginStatus', (req, res) => {
  if (!req.user) {
    return res.status(200).json({
      success: true,
      user: null
    })
  }
  return res.status(200).json({
    success: true,
    user: {
      firstName: req.user.profile.firstName,
      lastName: req.user.profile.lastName,
    }
  })
});

module.exports = router;