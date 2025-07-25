import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getVideoComments } from "../controllers/comments.controller.js";

const router =Router();

router.route("/get-comments").get(verifyJWT , getVideoComments)

export default router;