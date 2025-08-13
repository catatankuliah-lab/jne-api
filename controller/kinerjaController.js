import Kinerja from "../models/kinerjaModel.js";

// Tambah Kinerja
export const addKinerja = async (req, res) => {
  try {
    const data = {
      ...req.body,
      is_deleted: 0,
    };

    const result = await Kinerja.addKinerja(data);
    res.status(201).json({ message: "Kinerja berhasil ditambahkan", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan bagian", error: error.message });
  }
};

// Get Semua Kinerja berdasarkan karyawan dan tanggal (opsional filter)
export const getAllKinerja = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const result = await Kinerja.getAllKinerja({
      start_date,
      end_date,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kinerja", error: error.message });
  }
};

// Get Semua Kinerja berdasarkan karyawan dan tanggal (opsional filter)
export const getAllKinerjaByKaryawan = async (req, res) => {
  try {
    const id_karyawan = req.params.id;
    const { start_date, end_date } = req.query;

    const result = await Kinerja.getAllKinerjaByKaryawan({
      id_karyawan,
      start_date,
      end_date,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kinerja", error: error.message });
  }
};

// Get Detail Kinerja by ID
export const getKinerjaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Kinerja.getKinerjaById(id);

    if (!result) {
      return res.status(404).json({ message: "Kinerja tidak ditemukan" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail bagian", error: error.message });
  }
};

// Update Kinerja
export const updateKinerja = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Kinerja.updateKinerja(id, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kinerja tidak ditemukan." });
    }

    // Ambil data terbaru setelah update
    const updatedKinerja = await Kinerja.getKinerjaById(id);

    res.status(200).json({
      message: "Kinerja berhasil diperbarui.",
      data: updatedKinerja
    });
  } catch (error) {
    console.error("Error saat memperbarui bagian:", error);
    res.status(500).json({ message: "Gagal memperbarui bagian." });
  }
};

// Soft Delete Kinerja
export const deleteKinerja = async (req, res) => {
  try {
    const { id } = req.params;
    const { updated_by } = req.body; // harus dikirim dari client

    const result = await Kinerja.deleteKinerja(id, updated_by);
    res.status(200).json({ message: "Kinerja berhasil dihapus (soft delete)", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus bagian", error: error.message });
  }
};