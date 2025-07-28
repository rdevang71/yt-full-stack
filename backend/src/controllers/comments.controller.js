import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { apiError } from "../utils/apiErrors.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new apiError(400, " Invalid video ID");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(400, "Video not found");
  }

  const comments = await Comment.find({
    video: videoId,
  })
    .populate("owner", "username fullName avatar")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalComments = await Comment.countDocuments({ video: videoId });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        comments,
        pagination: {
          total: totalComments,
          page,
          limit,
          totalPages: Math.ceil(totalComments / limit),
        },
      },
      "Comments Fetched Successfully"
    )
  );
});

const addComment = asyncHandler(async (req, res) => {
  const { content, videoId } = req.body;

  if (!content) {
    throw new apiError(400, "Content of the comment is required");
  }

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });

  const addedComment = await Comment.findById(comment._id).populate(
    "owner",
    "username avatar"
  );

  if (!addedComment) {
    throw new apiError(
      500,
      " Something went wrong when publishing the comment"
    );
  }
  return res
    .status(201)
    .json(new apiResponse(200, addedComment, " Comment Added Successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const {updatedContent} = req.body;

  if (!updatedContent) {
    throw new apiError(400, "new content is required to update the comment ");
  }

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new apiError(404, "Invalid Comment id ");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new apiError(400, "Comment not found");
  }

  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to update this Comment");
  }

  comment.content = updatedContent;

  await comment.save();

  await comment.populate("owner", "username avatar");

  return res
    .status(200)
    .json(new apiResponse(200, comment, "comment Updated Successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {

    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new apiError(400, "Invalid Comment id ");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new apiError(400, "Comment not found");
  }

  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to delete this Comment");
  }

await Comment.deleteOne({ _id: commentId });

return res
.status(200)
.json(new apiResponse(200,null, "comment deleted successfully"))

})

export { getVideoComments, addComment , updateComment, deleteComment};
