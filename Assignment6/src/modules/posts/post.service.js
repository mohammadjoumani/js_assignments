import { fn, col } from "sequelize";
import postModel from "../../DB/models/post.model.js";
import commentModel from "../../DB/models/comment.model.js";
import userModel from "../../DB/models/user.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        const post = new postModel({
            title,
            content,
            userId,
        });

        await post.save();

        return res.status(201).json({
            message: "Post created successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await postModel.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found.",
            });
        }

        if (post.userId !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this post.",
            });
        }

        await post.destroy();

        return res.status(200).json({
            message: "Post deleted.",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};


export const getPostDetails = async (req, res) => {
    try {
        const posts = await postModel.findAll({
            attributes: ["id", "title"],
            include: [
                {
                    model: userModel,
                    attributes: ["id", "name"],
                },
                {
                    model: commentModel,
                    attributes: ["id", "content"],
                },
            ],
        });

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
};

export const getPostCommentCount = async (req, res) => {
    try {
        const posts = await postModel.findAll({
            attributes: [
                "id",
                "title",
                [fn("COUNT", col("Comments.id")), "commentCount"],
            ],
            include: [
                {
                    model: commentModel,
                    attributes: [],
                },
            ],
            group: ["Post.id"],
        });


        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};