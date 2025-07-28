import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscriptions.model.js";
import { Like } from "../models/like.model.js";
import { apiError } from "../utils/apiErrors.js";
import { Tweet } from "../models/tweet.model.js";
import { Comment } from "../models/comment.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
 
  const userId = req.user._id;

  const channel = await User.findById(userId);

  if (!channel) {
    throw new apiError(400, "Channel not found");
  }

  const totalSubscribers = await Subscription.countDocuments({ channel: userId });


  const totalVideos = await Video.countDocuments({ owner: userId });



  const userVideos = await Video.find({ owner: userId }).select("_id");
  const videoIds = userVideos.map((v) => v._id);
  const videoLikes = await Like.countDocuments({ video: { $in: videoIds } });

  const userComments = await Comment.find({ owner: userId }).select("_id");
  const commentIds = userComments.map((c) => c._id);
  const commentLikes = await Like.countDocuments({comment: { $in: commentIds }});

  const userTweets = await Tweet.find({ owner: userId }).select("_id");
  const tweetIds = userTweets.map((t) => t._id);
  const tweetLikes = await Like.countDocuments({ tweet: { $in: tweetIds } });

  const totalLikes = videoLikes + commentLikes + tweetLikes;

  return res
  .status(200)
  .json(
    new apiResponse(
        200,
        {
            totalSubscribers,
            totalVideos,
            videoLikes,
            tweetLikes,
            commentLikes,
            totalLikes
        },
        "Channel data fetched successfully"
    )
  )
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const userId = req.user._id;

  const channel = await User.findById(userId);

  if (!channel) {
    throw new apiError(400, "Channel Not Found");
  }

  const videos = await Video.find({ owner: userId })
    .populate("owner", " username avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPublishedVideos = await Video.countDocuments({
    isPublished: true,
    owner: userId,
  });
  const totalVideos = await Video.countDocuments({ owner: userId });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        videos,
        totalPublishedVideos,
        pagination: {
          total: totalVideos,
          page,
          limit,
          totalPages: Math.ceil(totalVideos / limit),
        },
      },
      "Fetched all videos successfully"
    )
  );
});

export { getChannelStats, getChannelVideos };
