// controllers/authController.js
import dotenv from "dotenv";
import AuthModel from "../models/authModel.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AuthModel.findUserByUsername(username);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Username atau password salah",
      });
    }

    const isMatch = await AuthModel.comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Username atau password salah.",
      });
    }

    const token = AuthModel.generateToken(user.id_user, user.id_role, SECRET_KEY);

    return res.json({
      status: "success",
      message: "Login berhasil.",
      data: user,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat memproses permintaan.",
    });
  }
};