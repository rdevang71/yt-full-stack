import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getVideoDurationInSeconds } from "get-video-duration";

const getAllVideos = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const videos = await Video.find({isPublished: true})
    .populate("owner", " username avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalVideos = await Video.countDocuments({isPublished: true});

  return res.status(200).json(
    new apiResponse(
      200,
      {
        videos,
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

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new apiError(400, "Title and description are required");
  }

  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
  const videoLocalPath = req.files?.video?.[0]?.path;

  if (!thumbnailLocalPath) {
    throw new apiError(400, "Thumbnail image needed");
  }
  if (!videoLocalPath) {
    throw new apiError(400, "Video file needed");
  }

  const duration = await getVideoDurationInSeconds(videoLocalPath);

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  const uploadedVideo = await uploadOnCloudinary(videoLocalPath);

  const video = await Video.create({
    title,
    description,
    thumbnail: thumbnail?.secure_url,
    videoFile: uploadedVideo.secure_url,
    duration, // ⏱️ Save extracted duration
    owner: req.user?._id,
  });

  const publishedVideo = await Video.findById(video._id).populate(
    "owner",
    "username avatar"
  );

  if (!publishedVideo) {
    throw new apiError(500, "Something went wrong while Publishing The Video");
  }

  return res
    .status(201)
    .json(new apiResponse(200, publishedVideo, "Video Published Successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid video ID");
  }

  const video = await Video.findOne( {_id: videoId, isPublished: true })
    .populate("owner", "username avatar")
    .exec();

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.query;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to update this video");
  }

  const updates = {};
  if (title) updates.title = title;
  if (description) updates.description = description;

  if (req.files?.thumbnail?.[0]?.path) {
    const newThumbnail = await uploadOnCloudinary(req.files.thumbnail[0].path);
    if (!newThumbnail?.secure_url) {
      throw new apiError(500, "Failed to upload new thumbnail");
    }
    updates.thumbnail = newThumbnail.secure_url;
  }


  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    { $set: updates },
    { new: true }
  ).populate("owner", "username avatar");

  return res
    .status(200)
    .json(new apiResponse(200, updatedVideo, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.query

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to delete this video");
  }

  await video.deleteOne();

  return res 
  .status(200)
  .json(new apiResponse(200, null, "Video deleted successfully "))
    
})

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to modify this video");
  }

  // Toggle the status
  video.isPublished = !video.isPublished;
  await video.save();

  return res.status(200).json(
    new apiResponse(200, { isPublished: video.isPublished }, `Video has been ${video.isPublished ? "published" : "unpublished"}`)
  );
});
const getUserVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new apiError(401, "User not authenticated");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const userVideos = await Video.find({
    owner: userId,
  })
    .populate("owner", "username avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Video.countDocuments({
    owner: userId,
    isPublished: true
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        videos: userVideos,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      },
      "Fetched user videos successfully"
    )
  );
});


export { getAllVideos, publishAVideo, getVideoById, updateVideo , deleteVideo ,getUserVideos, togglePublishStatus };