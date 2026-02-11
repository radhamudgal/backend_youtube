const express = require("express");
const {createChannel, getAccountDetails, getAllDetails} = require("../Controllers/channel.controller");
const {uploadVideo, getVideoDetails} = require("../Controllers/video.controller");

const router = express.Router();

router.post("/create-channel", createChannel)

router.get("/get-account-details", getAccountDetails)
router.get("/get-all-details/:id" , getAllDetails)



module.exports = router;