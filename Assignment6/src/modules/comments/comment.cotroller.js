import { Router } from "express";
import {
    createBulkComments,
    updateComment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails
} from "./comment.service.js";
const commentRouter = Router();




commentRouter.post("/", createBulkComments);
commentRouter.patch("/:commentId", updateComment);
commentRouter.post("/find-or-create", findOrCreateComment);
commentRouter.get("/search", searchComments);
commentRouter.get("/newest/:postId", getNewestComments);
commentRouter.get("/details/:id", getCommentDetails);

export default commentRouter;