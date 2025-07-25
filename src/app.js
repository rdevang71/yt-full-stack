import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({
    limit:"24kb"
}))
app.use(express.urlencoded({extended: true, limit :"24kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// routes import
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import subscribtionRouter from "./routes/subscriptions.routes.js"
import likesRouter from "./routes/likes.routes.js"
import commentRouter from "./routes/comments.routes.js"
import tweetRouter from "./routes/tweets.routes.js"
import playlistRouter from "./routes/playlist.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/subscriptions", subscribtionRouter)
app.use("/api/v1/likes",likesRouter)
app.use("/api/v1/comment",commentRouter)
app.use("/api/v1/tweet", tweetRouter)
app.use("/api/v1/playlist", playlistRouter)


export {app}