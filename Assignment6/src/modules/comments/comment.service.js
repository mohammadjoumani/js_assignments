import { Op } from "sequelize";
import commentModel from "../../DB/models/comment.model.js";
import postModel from "../../DB/models/post.model.js";
import userModel from "../../DB/models/user.model.js";

export const createBulkComments = async (req, res) => {
    try {
        const { comments } = req.body;

        console.log("Mohammad Joumani", comments);


        await commentModel.bulkCreate(comments);

        return res.status(201).json({
            message: "Comments created.",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};


export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;

        const comment = await commentModel.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found.",
            });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this comment.",
            });
        }

        comment.content = content;
        await comment.save();

        return res.status(200).json({
            message: "Comment updated.",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};


export const findOrCreateComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body;

        const [comment, created] = await commentModel.findOrCreate({
            where: {
                postId,
                userId,
                content,
            },
        });

        return res.status(200).json({
            comment,
            created,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const searchComments = async (req, res) => {
    try {
        const { word } = req.query;

        const result = await commentModel.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`,
                },
            },
        });

        if (result.count === 0) {
            return res.status(404).json({
                message: "No comments found.",
            });
        }

        return res.status(200).json({
            count: result.count,
            comments: result.rows,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};


export const getNewestComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await commentModel.findAll({
            where: { postId },
            attributes: ["id", "content", "createdAt"],
            order: [["createdAt", "DESC"]],
            limit: 3,
        });

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const getCommentDetails = async (req, res) => {
    try {
        const { id } = req.params;


        const comment = await commentModel.findByPk(id, {
            attributes: ["id", "content"],
            include: [
                {
                    model: userModel,
                    attributes: ["id", "name", "email"],
                },
                {
                    model: postModel,
                    attributes: ["id", "title", "content"],
                },
            ],
        });


        if (!comment) {
            return res.status(404).json({
                message: "no comment found",
            });
        }

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};