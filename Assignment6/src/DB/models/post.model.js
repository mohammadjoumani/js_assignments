import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from '../connectionDB.js'

const postModel = sequelize.define("Post",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
);

export default postModel;
