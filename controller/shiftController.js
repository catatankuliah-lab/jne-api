import Shift from "../models/shiftModel.js";

// Tambah Shift
export const addShift = async (req, res) => {
  try {
    const data = {
      ...req.body,
      is_deleted: 0,
    };

    const result = await Shift.addShift(data);
    res.status(201).json({ message: "Shift berhasil ditambahkan", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan shift", error: error.message });
  }
};

// Get Semua Shift
export const getAllShift = async (req, res) => {
  try {
    const result = await Shift.getAllShift();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data shift", error: error.message });
  }
};

// Get Detail Shift by ID
export const getShiftById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Shift.getShiftById(id);

    if (!result) {
      return res.status(404).json({ message: "Shift tidak ditemukan" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail shift", error: error.message });
  }
};

// Update Shift
export const updateShift = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Shift.updateShift(id, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Shift tidak ditemukan." });
    }

    // Ambil data terbaru setelah update
    const updatedShift = await Shift.getShiftById(id);

    res.status(200).json({
      message: "Shift berhasil diperbarui.",
      data: updatedShift
    });
  } catch (error) {
    console.error("Error saat memperbarui shift:", error);
    res.status(500).json({ message: "Gagal memperbarui shift." });
  }
};

// Soft Delete Shift
export const deleteShift = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Shift.deleteShift(id);
    res.status(200).json({ message: "Shift berhasil dihapus (soft delete)", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus shift", error: error.message });
  }
};