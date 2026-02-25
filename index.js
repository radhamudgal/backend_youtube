const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

// user router

const userRouter = require("./Routes/user.routes")
const channelRouter = require("./Routes/channel.routes")
const videoRouter = require('./Routes/video.routes')

const port = process.env.PORT || 4000

const app = express();

// parsing

app.use(express.json())

/*mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("DB is connected")
}).catch((err) => console.log("err", err.message)) */

// endpoints

app.use("/api", userRouter)
app.use('/api/videos', videoRouter)

app.use("/api/channel", channelRouter)
app.get("/", (req, res) => {
    return res.status(200).json({message : "Welcome to youtube backend MRU"})
})

app.listen(4000, () => {
    console.log("server is running on port: " + 4000)
})

//.  http://localhost:4000/api/create-user