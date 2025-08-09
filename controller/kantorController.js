import Kantor from "../models/kantorModel.js";

// Tambah Kantor
export const addKantor = async (req, res) => {
  try {
    const data = {
      ...req.body,
      is_deleted: 0,
    };

    const result = await Kantor.addKantor(data);
    res.status(201).json({ message: "Kantor berhasil ditambahkan", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan kantor", error: error.message });
  }
};

// Get Semua Kantor
export const getAllKantor = async (req, res) => {
  try {
    const result = await Kantor.getAllKantor();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kantor", error: error.message });
  }
};

// Get Detail Kantor by ID
export const getKantorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Kantor.getKantorById(id);

    if (!result) {
      return res.status(404).json({ message: "Kantor tidak ditemukan" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail kantor", error: error.message });
  }
};

// Update Kantor
export const updateKantor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Kantor.updateKantor(id, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kantor tidak ditemukan." });
    }

    // Ambil data terbaru setelah update
    const updatedKantor = await Kantor.getKantorById(id);

    res.status(200).json({
      message: "Kantor berhasil diperbarui.",
      data: updatedKantor
    });
  } catch (error) {
    console.error("Error saat memperbarui kantor:", error);
    res.status(500).json({ message: "Gagal memperbarui kantor." });
  }
};

// Soft Delete Kantor
export const deleteKantor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Kantor.deleteKantor(id);
    res.status(200).json({ message: "Kantor berhasil dihapus (soft delete)", result });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus kantor", error: error.message });
  }
};