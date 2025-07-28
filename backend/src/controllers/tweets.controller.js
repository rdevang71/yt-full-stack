import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const tweet = await Tweet.create({
    content,
    owner: req.user?._id,
  });

  const publishedTweet = await Tweet.findById(tweet._id).populate(
    "owner",
    "fullName avatar"
  );

  if (!publishedTweet) {
    throw new apiError(400, "Something Went wrong while creating the tweet");
  }

  return res
    .status(200)
    .json(new apiResponse(200, publishedTweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(400, "User not found");
  }

  const tweets = await Tweet.find({ owner: userId })
    .populate("owner", " username avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalTweets = await Tweet.countDocuments({ owner: userId });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        tweets,
        pagination: {
          total: totalTweets,
          page,
          limit,
          totalPages: Math.ceil(totalTweets / limit),
        },
      },
      "Fetched all Tweets Successfully"
    )
  );
});

const updateTweet = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { tweetId } = req.query;
  const { content } = req.body;

  if(!mongoose.Types.ObjectId.isValid(tweetId)){
    throw new apiError(400,"invalid tweet ID")
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(400, "User Not Found");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new apiError(404, "Tweet not found");
  }

  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, " You Are Not authorized to update the comment");
  }

  tweet.content = content;

  await tweet.save();

  await tweet.populate("owner", "username avatar");

  return res
    .status(200)
    .json(new apiResponse(200, tweet, "Tweet Updated Successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { tweetId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(tweetId)){
    throw new apiError(400,"invalid tweet ID")
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(400, "User Not Found");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new apiError(404, "Tweet not found");
  }

  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, " You Are Not authorized to delete the comment");
  }

  await tweet.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, null, "tweet deleted successfully"));
});

export { 
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet 
};
