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
    telpon_user,
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
      telpon_user,
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

export const getAllPIC = async (req, res) => {
  try {
    const data = await User.getAllPIC();

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

export const getAllPICKantor = async (req, res) => {
  const { id_kantor } = req.params;
  try {
    const data = await User.getAllPICKantor(id_kantor);

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

export const getAllChecker = async (req, res) => {
  try {
    const data = await User.getAllChecker();

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

export const getAllCheckerGudang = async (req, res) => {
  const { id_gudang } = req.params;
  try {
    const data = await User.getAllCheckerGudang(id_gudang);

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