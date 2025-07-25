import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getVideoComments, addComment } from "../controllers/comments.controller.js";

const router =Router();

router.route("/get-comments").get(verifyJWT , getVideoComments)
router.route("/add-comment").post(verifyJWT , addComment)

export default router;