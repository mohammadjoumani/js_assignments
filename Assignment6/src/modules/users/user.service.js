import userModel from "../../DB/models/user.model.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await userModel.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists.",
            });
        }

        const user = userModel.build({
            name,
            email,
            password,
            role,
        });

        await user.save();


        return res.status(201).json({
            message: "User added successfully.",
        });


    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                message: error.errors[0].message,
            });
        }


        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};


export const upsertUser = async (req, res) => {
    try {
        const { id } = req.params;


        await userModel.upsert(
            {
                id,
                ...req.body,
            },
            {
                validate: false,
            }
        );


        return res.status(200).json({
            message: "User created or updated successfully",
        });


    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};


export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;

        const user = await userModel.findOne({ where: { email } });

        if (user) {
            return res.status(200).json({
                user,
            });
        }

        return res.status(400).json({
            message: "No user found.",
        });


    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findOne({
            where: { id }, attributes: {
                exclude: ["role"],
            },
        });

        if (user) {
            return res.status(200).json({
                user,
            });
        }

        return res.status(400).json({
            message: "No user found.",
        });


    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
