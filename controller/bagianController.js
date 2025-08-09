import Bagian from "../models/bagianModel.js";

// Tambah Bagian
export const addBagian = async (req, res) => {
  try {
    const data = {
      ...req.body,
      is_deleted: 0,
    };

    const result = await Bagian.addBagian(data);
    res.status(201).json({ message: "Bagian berhasil ditambahkan", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan bagian", error: error.message });
  }
};

// Get Semua Bagian
export const getAllBagian = async (req, res) => {
  try {
    const result = await Bagian.getAllBagian();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data bagian", error: error.message });
  }
};

// Get Detail Bagian by ID
export const getBagianById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Bagian.getBagianById(id);

    if (!result) {
      return res.status(404).json({ message: "Bagian tidak ditemukan" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail bagian", error: error.message });
  }
};

// Get Detail Bagian by ID
export const getBagianByIdDepartemen = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Bagian.getBagianByIdDepartemen(id);

    if (!result) {
      return res.status(404).json({ message: "Bagian tidak ditemukan" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail bagian", error: error.message });
  }
};

// Update Bagian
export const updateBagian = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Bagian.updateBagian(id, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Bagian tidak ditemukan." });
    }

    // Ambil data terbaru setelah update
    const updatedBagian = await Bagian.getBagianById(id);

    res.status(200).json({
      message: "Bagian berhasil diperbarui.",
      data: updatedBagian
    });
  } catch (error) {
    console.error("Error saat memperbarui bagian:", error);
    res.status(500).json({ message: "Gagal memperbarui bagian." });
  }
};

// Soft Delete Bagian
export const deleteBagian = async (req, res) => {
  try {
    const { id } = req.params;
    const { updated_by } = req.body; // harus dikirim dari client

    const result = await Bagian.deleteBagian(id, updated_by);
    res.status(200).json({ message: "Bagian berhasil dihapus (soft delete)", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus bagian", error: error.message });
  }
};

export const getBagianByDepartemenMultiple = async (req, res) => {
  const { id_departemen } = req.body;
  try {
    const result = await Bagian.getBagianByDepartemenMultiple(id_departemen);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data bagian",
      error: error.message,
    });
  }
};