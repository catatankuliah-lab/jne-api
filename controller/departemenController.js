import Departemen from "../models/departemenModel.js";

// Tambah Departemen
export const addDepartemen = async (req, res) => {
  try {
    const data = {
      ...req.body,
      is_deleted: 0,
    };

    const result = await Departemen.addDepartemen(data);
    res.status(201).json({ message: "Departemen berhasil ditambahkan", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan departemen", error: error.message });
  }
};

// Get Semua Departemen
export const getAllDepartemen = async (req, res) => {
  try {
    const result = await Departemen.getAllDepartemen();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data departemen", error: error.message });
  }
};

// Get Detail Departemen by ID
export const getDepartemenById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Departemen.getDepartemenById(id);

    if (!result) {
      return res.status(404).json({ message: "Departemen tidak ditemukan" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail departemen", error: error.message });
  }
};

// Update Departemen
export const updateDepartemen = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Departemen.updateDepartemen(id, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Departemen tidak ditemukan." });
    }

    // Ambil data terbaru setelah update
    const updatedDepartemen = await Departemen.getDepartemenById(id);

    res.status(200).json({
      message: "Departemen berhasil diperbarui.",
      data: updatedDepartemen
    });
  } catch (error) {
    console.error("Error saat memperbarui departemen:", error);
    res.status(500).json({ message: "Gagal memperbarui departemen." });
  }
};

// Soft Delete Departemen
export const deleteDepartemen = async (req, res) => {
  try {
    const { id } = req.params;
    const { updated_by } = req.body;

    const result = await Departemen.deleteDepartemen(id, updated_by);
    res.status(200).json({ message: "Departemen berhasil dihapus (soft delete)", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus departemen", error: error.message });
  }
};