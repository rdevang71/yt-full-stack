import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(400, "User not found");
  }

  if (!name) {
    throw new apiError(400, "name is required for the playlist");
  }

  if (!description) {
    throw new apiError(400, "Descrpition is required for the playlist");
  }

  const playlist = await Playlist.create({
    name,
    description,
    owner: userId,
  });

  if (!playlist) {
    throw new apiError(500, "Something went wrong while creating the playlist");
  }

  return res
    .status(200)
    .json(new apiResponse(200, playlist, "playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new apiError(400, "Invalid user ID");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(400, "User Not Found");
  }

  const playlists = await Playlist.find({ owner: userId })
    .populate("owner", "username avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalplaylists = await Playlist.countDocuments({ owner: userId });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        playlists,
        pagination: {
          total: totalplaylists,
          page,
          limit,
          totalPages: Math.ceil(totalplaylists / limit),
        },
      },
      "Fetched all playlists Successfully"
    )
  );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, "Invalid playlist ID");
  }

  const playlist = await Playlist.findById(playlistId).populate(
    "owner",
    "username avatar"
  );

  if (!playlist) {
    throw new apiError(404, "playlist not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, playlist, "playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid Video ID");
  }

  const video = await Video.findById(videoId).populate(
    "owner",
    "username avatar"
  );

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, "Invalid playlist ID");
  }

  const playlist = await Playlist.findById(playlistId).populate(
    "owner",
    "username avatar"
  );

  if (!playlist) {
    throw new apiError(404, "playlist not found");
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $push: { video: videoId },
    },
    { new: true }
  );

  if (!updatedPlaylist) {
    throw new apiError(
      400,
      " Something went wrong while adding video to the playlist"
    );
  }

  const totalVideosInPlaylist = updatedPlaylist.video.length;

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { updatedPlaylist, totalVideosInPlaylist },
        "Video addeded to the playlist successfully"
      )
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, "Invalid Video ID");
  }

  const video = await Video.findById(videoId).populate(
    "owner",
    "username avatar"
  );
  if (!video) {
    throw new apiError(404, "Video not found");
  }

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, "Invalid playlist ID");
  }

  const playlist = await Playlist.findById(playlistId).populate(
    "owner",
    "username avatar"
  );
  if (!playlist) {
    throw new apiError(404, "Playlist not found");
  }

  const videoExists = playlist.video.some((v) => v.toString() === videoId);

  if (!videoExists) {
    throw new apiError(400, "Video not found in the playlist");
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $pull: { video: videoId },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        updatedPlaylist,
        "Video removed from playlist successfully"
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, "Invalid playlist ID");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new apiError(404, "Playlist not found");
  }

  await playlist.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, null, "playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new apiError(400, "Invalid playlist ID");
  }

  if (!name) {
    throw new apiError(400, "name is required for the playlist");
  }

  if (!description) {
    throw new apiError(400, "Description is required for the playlist");
  }

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      name,
      description,
    },
    {
      new: true,
    }
  );

  if (!playlist) {
    throw new apiError(404, "Playlist not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, playlist, "Playlist updated successfully"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
