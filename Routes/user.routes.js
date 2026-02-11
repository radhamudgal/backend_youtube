const express = require("express");
const {createUser,getUsers} = require("../Controllers/user.controller")

// router

const router = express.Router();

router.post("/create-user", createUser)
router.get("/get-users",getUsers)

module.exports = router;