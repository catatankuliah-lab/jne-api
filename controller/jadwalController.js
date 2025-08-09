import Jadwal from "../models/jadwalModel.js";

export const addBulkJadwal = async (req, res) => {
  try {
    const jadwalArray = req.body;

    // Validasi: harus array dan tidak kosong
    if (!Array.isArray(jadwalArray) || jadwalArray.length === 0) {
      return res.status(400).json({ message: "Data harus berupa array dan tidak boleh kosong." });
    }

    // Set default is_deleted = 0 jika tidak ada
    const dataWithDefault = jadwalArray.map((item) => ({
      ...item,
      is_deleted: 0,
    }));

    // Panggil model
    const result = await Jadwal.addBulkJadwal(dataWithDefault);

    // Kirim response sukses
    res.status(201).json({ message: "Berhasil menambahkan banyak jadwal.", result });
  } catch (error) {
    // Tangkap error
    res.status(500).json({ message: "Gagal menambahkan banyak jadwal", error: error.message });
  }
};

export const getJadwalByKaryawanAndTanggal = async (req, res) => {
  try {
    const { id_karyawan, tanggal, bulan, tahun } = req.params;

    if (!id_karyawan || !tanggal || !bulan || !tahun) {
      return res.status(400).json({ message: "Semua parameter harus diisi." });
    }

    const data = await Jadwal.getJadwalByKaryawanAndTanggal({
      id_karyawan,
      tanggal,
      bulan,
      tahun,
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error getJadwalByKaryawanAndTanggal:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};