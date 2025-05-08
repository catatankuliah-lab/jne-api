import KendaraanMasuk from "../models/kendaraanmasukModel.js";

// Get all records
export const getAllKendaraanMasuk = async (req, res) => {
  try {
    const data = await KendaraanMasuk.getAll();
    res.status(200).json({
      status: "success",
      data,
      message: "Data kendaraan masuk berhasil diambil."
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat mengambil data."
    });
  }
};

// Get by ID
export const getKendaraanMasukById = async (req, res) => {
  const { id_kendaraan_masuk } = req.params;
  try {
    const data = await KendaraanMasuk.getById(id_kendaraan_masuk);
    if (data) {
      res.status(200).json({
        status: "success",
        data,
        message: "Data ditemukan."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan."
      });
    }
  } catch (error) {
    console.error("Error fetching by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan server."
    });
  }
};

// Add new record
export const addKendaraanMasuk = async (req, res) => {
  const { id_driver, id_armada, tanggal_masuk, solar_tangka, solar_jarum, solar_amper, solar_aplikasi, kebersihan_kendaraan, fisik_kendaraan, } = req.body;
  try {
    const id_kendaraan_masuk = await KendaraanMasuk.add(id_driver, id_armada, tanggal_masuk, solar_tangka, solar_jarum, solar_amper, solar_aplikasi, kebersihan_kendaraan, fisik_kendaraan,);
    console.log(id_kendaraan_masuk);

    res.status(201).json({
      status: "success",
      data: { id_kendaraan_masuk},
      message: "Data kendaraan masuk berhasil ditambahkan."
    });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal menambahkan data."
    });
  }
};

// Update record
export const updateKendaraanMasuk = async (req, res) => {
  const { id_kendaraan_masuk } = req.params;
  const updatedData = req.body;
  try {
    const success = await KendaraanMasuk.update(id_kendaraan_masuk, updatedData);
    if (success) {
      res.status(200).json({
        status: "success",
        message: "Data kendaraan masuk berhasil diperbarui."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan."
      });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal memperbarui data."
    });
  }
};

// Delete record
export const deleteKendaraanMasuk = async (req, res) => {
  const { id_kendaraan_masuk } = req.params;
  try {
    const success = await KendaraanMasuk.delete(id_kendaraan_masuk);
    if (success) {
      res.status(200).json({
        status: "success",
        message: "Data kendaraan masuk berhasil dihapus."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan."
      });
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({
      status: "error",
      message: "Gagal menghapus data."
    });
  }
};
