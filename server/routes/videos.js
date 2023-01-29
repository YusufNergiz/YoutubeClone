import express from "express";
import { verifyToken } from "../verifyToken.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";
import User from "../models/User.js";


const router = express.Router();

const addVideo = async (req, res, next) => {
    try {
        // Setting the userId of the video to the current User, and getting the rest of the
        // video info ( title, description, etc ) from the body.
        const newVideo = new Video({ userId: req.user.id, ...req.body });
        console.log("Hi")
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (error) {
        next(error)
    }
}

const updateVideo = async (req, res, next) => {
    // Getting the video to be updated
    const videoToUpdate = await Video.findById(req.params.videoId);
    // Checking if the video's userId Matches the current User
    if (req.user.id === videoToUpdate.userId) {
        try {
            // If yes update the video using the req.body.
            await Video.updateOne({ videoId: req.params.videoId }, {
                $set: req.body
            })
            res.status(202).json("Video Successfully Updated!");
        } catch (error) {
            next(error)
        }
    }
    else {
        next(createError(401, "You can only update your videos!"))
    }
}

const deleteVideo = async (req, res, next) => {
    // Getting the video to be deleted
    const videoToDelete = await Video.findById(req.params.videoId);
    // Checking if the video's userId Matches the current User
    if (req.user.id === videoToDelete.userId) {
        try {
            // If yes Delete the video.
            await Video.findByIdAndDelete(req.params.videoId);
            res.status(201).json("Video Successfully Deleted!");
        } catch (error) {
            next(error)
        }
    }
    else {
        next(createError(401, "You can only delete your videos!"));
    }
}

const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

const addView = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increased!");
    } catch (error) {
        next(error)
    }
}

const getRandomVideos = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

const getTrend = async (req, res, next) => {
    try {
        const trendingVideos = await Video.find().sort({ views: -1 });
        res.status(200).json(trendingVideos);
    } catch (error) {
        next(error)
    }
}

const getSubscribedChannelVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;
        if (subscribedChannels) {
            const allVideos = await Promise.all(subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId })
            }))
            res.status(200).json(allVideos.flat().sort((x, y) => y.createdAt - x.createdAt));
        }
        else {
            next(createError(401, "You don't have any subscribed channels, try subbing to some!!"))
            return;
        }
    } catch (error) {
        next(error)
    }
}

const getByTags = async (req, res, next) => {
    try {
        // Get the tags from the URL queries ----> localhost:3000/api/videos/tags?tags=js,py,c
        const tags = req.query.tags.split(',');
        // Get the videos from the database that contains the given tags in their "tags" array.
        const videosWithTags = await Video.find({ tags: { $in: tags } }).limit(20);
        console.log(videosWithTags)
        res.status(200).json(videosWithTags);
    } catch (error) {
        next(error)
    }
}

const searchVideos = async (req, res, next) => {
    try {
        const searchedTitle = req.query.q;
        const searchedVideos = await Video.find({ title: { $regex: searchedTitle, $options: 'i' } }).limit(40);
        res.status(200).json(searchedVideos);
    } catch (error) {
        next(error)
    }
}

// Create a Video
router.post("/", verifyToken, addVideo);

// Update Current User's Video
router.put("/update/:videoId", verifyToken, updateVideo);

// Delete Current User's Video
router.delete("/delete/:videoId", verifyToken, deleteVideo);

// Get a Searched Video
router.get("/find/:id", getVideo);

// Increment the View count of a video
router.put("/view/:id", addView);

// Get all the Videos Trending
router.get("/trend", getTrend);

// Get some Random Videos to display in the Explore page
router.get("/random", getRandomVideos);

// Get all the videos of all the Subscribed channels
router.get("/sub", verifyToken, getSubscribedChannelVideos);

// Get all the videos with the given tags
router.get("/tags", getByTags);

// Get a list of videos with the similar keywords in their titles
router.get("/search", searchVideos);


export default router;