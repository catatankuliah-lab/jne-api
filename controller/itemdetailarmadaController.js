import ItemDetailArmada from "../models/itemDetailArmadaModel.js";

// Get all records
export const getAllItemDetailArmada = async (req, res) => {
  try {
    const data = await ItemDetailArmada.getAll();
    res.status(200).json({
      status: "success",
      data,
      message: "Data item detail armada berhasil diambil."
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
export const getItemDetailArmadaById = async (req, res) => {
  const { id_item_detail_armada } = req.params;
  try {
    const data = await ItemDetailArmada.getById(id_item_detail_armada);
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

export const getItemDetailArmadaByIdKendaraanMasuk = async (req, res) => {
  const { id_kendaraan_masuk } = req.params;
  try {
    const data = await ItemDetailArmada.getByIdKendaraanMasuk(id_kendaraan_masuk);
    if (data && data.length > 0) {
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
    console.error("Error fetching by id_kendaraan_masuk:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan server."
    });
  }
};

// Add new record
export const addItemDetailArmada = async (req, res) => {
  const { id_kendaraan_masuk } = req.body;
  console.log("Request Body:", req.body);  // Debugging log

  try {
    const id_item_detail_armada = await ItemDetailArmada.add(id_kendaraan_masuk);
    res.status(201).json({
      status: "success",
      data: { id_item_detail_armada },
      message: "Data item detail armada berhasil ditambahkan."
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
export const updateItemDetailArmada = async (req, res) => {
  const { id_item_detail_armada } = req.params;
  const updatedData = req.body;
  try {
    const success = await ItemDetailArmada.update(id_item_detail_armada, updatedData);
    if (success) {
      res.status(200).json({
        status: "success",
        message: "Data item detail armada berhasil diperbarui."
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
export const deleteItemDetailArmada = async (req, res) => {
  const { id_item_detail_armada } = req.params;
  try {
    const success = await ItemDetailArmada.delete(id_item_detail_armada);
    if (success) {
      res.status(200).json({
        status: "success",
        message: "Data item detail armada berhasil dihapus."
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
