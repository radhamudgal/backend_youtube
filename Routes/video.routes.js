const express = require('express');
const {publishVideo} = require('../Controllers/video.controller');
const router = express.Router();
router.post('/publish-video' ,publishVideo);
module.exports = router;