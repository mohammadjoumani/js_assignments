import { Router } from "express";
import { createPost, deletePost, getPostDetails, getPostCommentCount } from "./post.service.js";
const postRouter = Router();


postRouter.post("/", createPost);
postRouter.delete("/:postId", deletePost);
postRouter.get("/details", getPostDetails);
postRouter.get("/comment-count", getPostCommentCount);

export default postRouter;