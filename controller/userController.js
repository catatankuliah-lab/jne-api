import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import multer from "multer";

export const createUser = async (req, res) => {
  const {id_role, id_kantor, username, password, nama_lengkap, status_user } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const id_user = await User.addUser(id_role, id_kantor, username, hashedPassword, nama_lengkap, status_user);

    res.status(201).json({
      status: "success",
      data: { id_user, id_role, id_kantor, username, nama_lengkap, status_user },
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