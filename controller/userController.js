import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const {
    id_role,
    id_kantor,
    username,
    password,
    nama_lengkap,
    status_user,
  } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Buat object userData yang akan dikirim ke addUser
    const userData = {
      id_role,
      id_kantor,
      username,
      password: hashedPassword,
      nama_lengkap,
      status_user,
    };

    // Simpan ke database dengan addUser yang dinamis
    await User.addUser(userData);

    res.status(201).json({
      status: "success",
      data: userData,
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