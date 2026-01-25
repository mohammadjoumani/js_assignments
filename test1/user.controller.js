import userModel from "../DB/models/user.model.js";
import { Op } from "sequelize";

export const createUser = async (req, res, next) => {
  try {
    const { id, firstName, lastName, email, age, gender } = req.body;

    const user = await userModel.create({
      id,
      firstName,
      lastName,
      email,
      age,
      gender
    });

    return res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    // const { id } = req.params;

    // if (id) {
    //   const user = await userModel.findByPk(id);

    //   if (!user) {
    //     return res.status(404).json({ message: "User not found" });
    //   }

    //   return res.status(200).json({
    //     message: "Done",
    //     user
    //   });
    // }

    const users = await userModel.findAll({
      where: {
        age: {
          [Op.gte]: 18
        }
      },
      attributes: {
        exclude: ["password"]
      }
    });

    return res.status(200).json({
      message: "Done",
      users
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};