const Video = require('../Models/video.model');

const VideoStats = require('../Models/videostats.model');

const publishVideo = async (req, res) => {
    try{
        const {title, description, channelId , catergory, tags} = req.body;

        const video = new Video ({
            title , description , channelId
        });

        await video.save();

        const stats = new VideoStats({
            catergory,tags, videoId:video.Id
        });

        await stats.save();
        return res.status(201).json({message: "Video published successfully", videoId: video.Id});  

    }

    catch(err) {
         console.log("err", err);
    }
}
module.exports= {
    publishVideo
};