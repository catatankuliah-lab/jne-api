import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const {
    id_role,
    id_kantor,
    id_gudang,
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
      id_gudang,
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

export const getPIC = async (req, res) => {

  try {
    const data = await User.getPIC();

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "PIC not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Success fatching PIC",
      data,
    });
  } catch (error) {
    console.error("Error fetching PIC:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};