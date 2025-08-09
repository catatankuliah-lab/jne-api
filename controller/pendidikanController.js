import Pendidikan from "../models/pendidikanModel.js";

// Get Semua Pendidikan
export const getAllPendidikan = async (req, res) => {
  try {
    const result = await Pendidikan.getAllPendidikan();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data pendidikan", error: error.message });
  }
};