import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import { Tweet } from "../models/tweet.model.js";
import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found");
  }

  const existingLike = await Like.findOne({
    video: videoId,
    likedBy: userId,
  });

  if (existingLike) {
    await existingLike.deleteOne();

    const likes = await Like.find({ video: videoId })
      .populate("likedBy", "username fullName avatar")
      .sort({ createdAt: -1 });

    const totalLikes = likes.length;

    return res.status(200).json(
      new apiResponse(
        200,
        {
          totalLikes,
          likes: likes.map((sub) => sub.likedBy),
        },
        "Video Unliked successfully"
      )
    );
  } else {
    await Like.create({
      video: videoId,
      likedBy: userId,
    });

    const likes = await Like.find({ video: videoId })
      .populate("likedBy", "username fullName avatar")
      .sort({ createdAt: -1 });

    const totalLikes = likes.length;

    return res.status(200).json(
      new apiResponse(
        200,
        {
          totalLikes,
          likes: likes.map((sub) => sub.likedBy),
        },
        "Video liked successfully"
      )
    );
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new apiError(400, "Invalid Comment Id");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new apiError(404, "Comment not found");
  }

  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: userId,
  });

  if (existingLike) {
    await existingLike.deleteOne();

    const likes = await Like.find({ comment: commentId })
      .populate("likedBy", "username fullName avatar")
      .sort({ createdAt: -1 });

    const totalLikes = likes.length;

    return res.status(200).json(
      new apiResponse(
        200,
        {
          totalLikes,
          likes: likes.map((sub) => sub.likedBy),
        },
        "Comment Unliked successfully"
      )
    );
  } else {
    await Like.create({
      comment: commentId,
      likedBy: userId,
    });

    const likes = await Like.find({ comment: commentId })
      .populate("likedBy", "username fullName avatar")
      .sort({ createdAt: -1 });

    const totalLikes = likes.length;

    return res.status(200).json(
      new apiResponse(
        200,
        {
          totalLikes,
          likes: likes.map((sub) => sub.likedBy),
        },
        "Comment liked successfully"
      )
    );
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    throw new apiError(400, "Invalid Tweet Id");
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new apiError(404, "Tweet not found");
  }

  const existingLike = await Like.findOne({
    tweet: tweetId,
    likedBy: userId,
  });

  if (existingLike) {
    await existingLike.deleteOne();

    const likes = await Like.find({ tweet: tweetId })
      .populate("likedBy", "username fullName avatar")
      .sort({ createdAt: -1 });

    const totalLikes = likes.length;

    return res.status(200).json(
      new apiResponse(
        200,
        {
          totalLikes,
          likes: likes.map((sub) => sub.likedBy),
        },
        "Tweet Unliked successfully"
      )
    );
  } else {
    await Like.create({
      tweet: tweetId,
      likedBy: userId,
    });

    const likes = await Like.find({ tweet: tweetId })
      .populate("likedBy", "username fullName avatar")
      .sort({ createdAt: -1 });

    const totalLikes = likes.length;

    return res.status(200).json(
      new apiResponse(
        200,
        {
          totalLikes,
          likes: likes.map((sub) => sub.likedBy),
        },
        "Tweet liked successfully"
      )
    );
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    
    const likes = await Like.find({ likedBy: userId })
        .populate("video", "title thumbnail")
        .sort({ createdAt: -1 });
    
    if (!likes.length) {
        return res.status(404).json(new apiResponse(404, [], "No liked videos found"));
    }
    
    return res.status(200).json(
        new apiResponse(200, likes, "Liked videos retrieved successfully")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };