import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const {
    id_role,
    username,
    password,
    created_by,
  } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const userData = {
      username,
      password: hashedPassword,
      id_role,
      created_by,
      updated_by: created_by,
    };

    await User.addUser(userData);

    res.status(201).json({
      status: "success",
      data: {
        username: userData.username,
        id_role: userData.id_role,
      },
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Internal Server Error",
    });
  }
};
