import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscriptions.model.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Toggle subscription controller
const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const subscriberId = req.user._id;

  
  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new apiError(400, "Invalid channel ID");
  }


  const channel = await User.findById(channelId);
  if (!channel) {
    throw new apiError(404, "Channel (User) not found");
  }


  if (channelId.toString() === subscriberId.toString()) {
    throw new apiError(400, "You cannot subscribe to your own channel");
  }


  const existingSubscription = await Subscription.findOne({
    channel: channelId,
    subscriber: subscriberId,
  });

  if (existingSubscription) {
    await existingSubscription.deleteOne();

    const subscribers = await Subscription.find({ channel: channelId })
      .populate("subscriber", "username fullName avatar")
      .sort({ createdAt: -1 });

    const totalSubscribers = subscribers.length;

    return res.status(200).json(
      new apiResponse(200, {
        totalSubscribers,
        subscribers: subscribers.map((sub) => sub.subscriber),
      }, "Unsubscribed from the channel")
    );
  } else {
    await Subscription.create({
      channel: channelId,
      subscriber: subscriberId,
    });

    const subscribers = await Subscription.find({ channel: channelId })
      .populate("subscriber", "username fullName avatar")
      .sort({ createdAt: -1 });

    const totalSubscribers = subscribers.length;

    return res.status(201).json(
      new apiResponse(201, {
        totalSubscribers,
        subscribers: subscribers.map((sub) => sub.subscriber),
      }, "Subscribed to the channel")
    );
  }
});

// Get subscribers of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new apiError(400, "Invalid channel ID");
  }

  const channel = await User.findById(channelId);
  if (!channel) {
    throw new apiError(404, "Channel (User) not found");
  }

  const subscribers = await Subscription.find({ channel: channelId })
    .populate("subscriber", "username fullName avatar")
    .sort({ createdAt: -1 });

  const totalSubscribers = subscribers.length;

  return res.status(200).json(
    new apiResponse(200, {
      totalSubscribers,
      subscribers: subscribers.map((sub) => sub.subscriber),
    }, "Subscribers fetched successfully")
  );
});

// Get channels subscribed by a user
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(subscriberId)) {
    throw new apiError(400, "Invalid Subscriber ID");
  }

  const subscriber = await User.findById(subscriberId);
  if (!subscriber) {
    throw new apiError(404, "User not found");
  }

  const channels = await Subscription.find({ subscriber: subscriberId })
    .populate("channel", "username fullName avatar")
    .sort({ createdAt: -1 });

  const totalSubscribedChannels = channels.length;

  return res.status(200).json(
    new apiResponse(200, {
      totalSubscribedChannels,
      channels: channels.map((sub) => sub.channel),
    }, "Channels fetched successfully")
  );
});

export {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
};
