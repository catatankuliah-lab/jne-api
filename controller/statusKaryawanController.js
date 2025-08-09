import StatusKaryawan from "../models/statusKaryawanModel.js";

// Get Semua StatusKaryawan
export const getAllStatusKaryawan = async (req, res) => {
  try {
    const result = await StatusKaryawan.getAllStatusKaryawan();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data statuskaryawan", error: error.message });
  }
};