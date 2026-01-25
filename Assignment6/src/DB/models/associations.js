import userModel from "./user.model.js";
import postModel from "./post.model.js";
import commentModel from "./comment.model.js";

/* User, Post */
userModel.hasMany(postModel, { foreignKey: "userId" });
postModel.belongsTo(userModel, { foreignKey: "userId"});

/* Post, Comment */
postModel.hasMany(commentModel, { foreignKey: "postId" });
commentModel.belongsTo(postModel, { foreignKey: "postId"});

/* User, Comment */
userModel.hasMany(commentModel, { foreignKey: "userId" });
commentModel.belongsTo(userModel, { foreignKey: "userId"});

export {
  userModel,
  postModel,
  commentModel,
};