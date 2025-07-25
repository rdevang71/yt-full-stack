import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getVideoComments, addComment, updateComment } from "../controllers/comments.controller.js";

const router =Router();

router.route("/get-comments").get(verifyJWT , getVideoComments)
router.route("/add-comment").post(verifyJWT , addComment)
router.route("/update-comment/:commentId").patch(verifyJWT , updateComment)

export default router;