import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from '../connectionDB.js'

const userModel = sequelize.define("User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                checkPasswordLength(value) {
                    if (value.length <= 6) {
                        throw new Error("Password must be longer than 6 characters");
                    }
                },
            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ["admin", "user"],
        },
    },
    {
        hooks: {
            beforeCreate(user) {
                if (user.name.length <= 2) {
                    throw new Error("Name must be longer than 2 characters");
                }
            },
        },
    }
);

export default userModel;
