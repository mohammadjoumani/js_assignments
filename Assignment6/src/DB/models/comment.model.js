import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from '../connectionDB.js'

const commentModel = sequelize.define("Comment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: DataTypes.STRING,
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        paranoid: true,
        timestamps: true,
    },
);

export default commentModel;
