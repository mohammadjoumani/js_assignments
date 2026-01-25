import "./DB/models/associations.js";
import express from "express";
import { checkConnection, checkSYncDB } from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.cotroller.js";
import postRouter from "./modules/posts/post.cotroller.js";
import commentRouter from "./modules/comments/comment.cotroller.js";

const app = express();

const port = 3000;

const bootStrap = () => {
    app.use(express.json());

    checkConnection();
    checkSYncDB();

    app.get("/", (req, res, next) => { 
        res.send("Server is running 🚀");
    });

    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    app.use('/comments', commentRouter);

    app.use((req, res, next) => {
        res.status(404).json({ message: `404 Not Found ${req.originalUrl}` });

    });

    app.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
}


export default bootStrap;