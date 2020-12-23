var express = require('express');
require('dotenv').config();

var router = express.Router();

router.get('/login', (req, res) => {
  return res.status(200).json({
    success: true,
    redirectUrl: `${process.env.HOST_URL}/login`
  })
});

module.exports = router;