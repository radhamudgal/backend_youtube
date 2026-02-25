const { default: mongoose } = require("mongoose");
const Channel = require("../Models/channel.model");
const User = require("../Models/user.model");

// api to create channel
const createChannel = async (req, res) => {
  try {
    const { ownerId, channelName, about } = req.body;

    // create channel

    const newChannel = new Channel({
      ownerId,
      channelName,
      about,
    });

    // save channel

    await newChannel.save();

    return res
      .status(201)
      .json({ message: "Channel created successfully", channel: newChannel });
  } catch (err) {
    console.log("err", err);
  }
};

// get account details

const getAccountDetails = async(req, res) => {
   try{
        const {userId} = req.body
        // 6970810b064d6fe8012bc4d7
       // logic
       const data = await User.aggregate([
        // stage 1
        {
           $match : {
            _id : new mongoose.Types.ObjectId(userId)
           }
        }, 
        // stage 2
        {
            $lookup : {
                from : "channels",
                localField : "_id",
                foreignField : "ownerId",
                as : "channels"
            }
        },

        // stage 3

        {
            $unwind : {
                path : "$details"
            }
        },

        //  stage 4
      {
    // $project: {
  
    // },
  },
       ])

       return res.status(200).json({message : "data fetched",  data})

    }catch(err){
        console.log("err", err)
    }
}

const getAllDetails = async (req, res) => {
  try{
    const { userId } = req.params;
    const data =  await User.aggregate([
        // stage 1
        {
           $match : {
            _id : new mongoose.Types.ObjectId(userId)
           }
        }, 
        // stage 2
        {
            $lookup : {
                from : "channels",
                localField : "_id",
                foreignField : "ownerId",
                as : "channels"
            }
        },

        //stage 3
        {
          $lookup :{
            from : "videos",
            localField : "channel._id",
            foreignField : "channelId",
            as : "video"

          }
        },

        //stage 4
         {
          $lookup :{
            from : "videostats",
            localField : "video._id",
            foreignField : "videoId",
            as : "stats"   

          }
        },

        
      {
        $addFields: {
          videos: {
            $map: {
              input: "$videos",
              as: "video",
              in: {
                $mergeObjects: [
                  "$$video",
                  {
                    stats: {
                      $filter: {
                        input: "$videoStats",
                        as: "stat",
                        cond: { $eq: ["$$stat.videoId", "$$video._id"] },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },


    ]);
    return res.status(200).json({message: "all details fetched"});
  } catch (err){
    console.log("err",err)
  }
}



module.exports = {createChannel, getAccountDetails, getAllDetails}