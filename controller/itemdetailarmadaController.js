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

// Add new record
export const addItemDetailArmada = async (req, res) => {
  const {
    id_kendaraan_masuk,
    kondisi_mobil_tampak_depan,
    keterangan_mobil_tampak_depan,
    foto_mobil_tampak_depan,
    kondisi_mobil_tampak_belakang,
    keterangan_mobil_tampak_belakang,
    foto_mobil_tampak_belakang,
    kondisi_mobil_tampak_kanan,
    keterangan_mobil_tampak_kanan,
    foto_mobil_tampak_kanan,
    kondisi_mobil_tampak_kiri,
    keterangan_mobil_tampak_kiri,
    foto_mobil_tampak_kiri,
    kondisi_mesin_atas,
    keterangan_mesin_atas,
    foto_mesin_atas,
    kondisi_mesin_kanan,
    keterangan_mesin_kanan,
    foto_mesin_kanan,
    kondisi_mesin_kiri,
    keterangan_mesin_kiri,
    foto_mesin_kiri,
    kondisi_power_stering,
    keterangan_power_stering,
    foto_power_stering,
    kondisi_draglink,
    keterangan_draglink,
    foto_draglink,
    kondisi_frame_mounting_dudukan_kabin,
    keterangan_frame_mounting_dudukan_kabin,
    foto_frame_mounting_dudukan_kabin,
    kondisi_gardan,
    keterangan_gardan,
    foto_gardan,
    kondisi_accu_aki,
    keterangan_accu_aki,
    foto_accu_aki,
    kondisi_ban_depan_kanan,
    keterangan_ban_depan_kanan,
    foto_ban_depan_kanan,
    kondisi_ban_depan_kiri,
    keterangan_ban_depan_kiri,
    foto_ban_depan_kiri,
    kondisi_ban_belakang_kanan_luar,
    keterangan_ban_belakang_kanan_luar,
    foto_ban_belakang_kanan_luar,
    kondisi_ban_belakang_kanan_dalam,
    keterangan_ban_belakang_kanan_dalam,
    foto_ban_belakang_kanan_dalam,
    kondisi_ban_belakang_kiri_luar,
    keterangan_ban_belakang_kiri_luar,
    foto_ban_belakang_kiri_luar,
    kondisi_ban_belakang_kiri_dalam,
    keterangan_ban_belakang_kiri_dalam,
    foto_ban_belakang_kiri_dalam,
    kondisi_kembang_ban_depan_kanan,
    keterangan_kembang_ban_depan_kanan,
    foto_kembang_ban_depan_kanan,
    kondisi_kembang_ban_depan_kiri,
    keterangan_kembang_ban_depan_kiri,
    foto_kembang_ban_depan_kiri,
    kondisi_kembang_ban_belakang_kanan,
    keterangan_kembang_ban_belakang_kanan,
    foto_kembang_ban_belakang_kanan,
    kondisi_kembang_ban_belakang_kiri,
    keterangan_kembang_ban_belakang_kiri,
    foto_kembang_ban_belakang_kiri
  } = req.body;
  console.log(req.body);
  try {
    const id_item_detail_armada = await ItemDetailArmada.add({
      id_kendaraan_masuk,
      kondisi_mobil_tampak_depan,
      keterangan_mobil_tampak_depan,
      foto_mobil_tampak_depan,
      kondisi_mobil_tampak_belakang,
      keterangan_mobil_tampak_belakang,
      foto_mobil_tampak_belakang,
      kondisi_mobil_tampak_kanan,
      keterangan_mobil_tampak_kanan,
      foto_mobil_tampak_kanan,
      kondisi_mobil_tampak_kiri,
      keterangan_mobil_tampak_kiri,
      foto_mobil_tampak_kiri,
      kondisi_mesin_atas,
      keterangan_mesin_atas,
      foto_mesin_atas,
      kondisi_mesin_kanan,
      keterangan_mesin_kanan,
      foto_mesin_kanan,
      kondisi_mesin_kiri,
      keterangan_mesin_kiri,
      foto_mesin_kiri,
      kondisi_power_stering,
      keterangan_power_stering,
      foto_power_stering,
      kondisi_draglink,
      keterangan_draglink,
      foto_draglink,
      kondisi_frame_mounting_dudukan_kabin,
      keterangan_frame_mounting_dudukan_kabin,
      foto_frame_mounting_dudukan_kabin,
      kondisi_gardan,
      keterangan_gardan,
      foto_gardan,
      kondisi_accu_aki,
      keterangan_accu_aki,
      foto_accu_aki,
      kondisi_ban_depan_kanan,
      keterangan_ban_depan_kanan,
      foto_ban_depan_kanan,
      kondisi_ban_depan_kiri,
      keterangan_ban_depan_kiri,
      foto_ban_depan_kiri,
      kondisi_ban_belakang_kanan_luar,
      keterangan_ban_belakang_kanan_luar,
      foto_ban_belakang_kanan_luar,
      kondisi_ban_belakang_kanan_dalam,
      keterangan_ban_belakang_kanan_dalam,
      foto_ban_belakang_kanan_dalam,
      kondisi_ban_belakang_kiri_luar,
      keterangan_ban_belakang_kiri_luar,
      foto_ban_belakang_kiri_luar,
      kondisi_ban_belakang_kiri_dalam,
      keterangan_ban_belakang_kiri_dalam,
      foto_ban_belakang_kiri_dalam,
      kondisi_kembang_ban_depan_kanan,
      keterangan_kembang_ban_depan_kanan,
      foto_kembang_ban_depan_kanan,
      kondisi_kembang_ban_depan_kiri,
      keterangan_kembang_ban_depan_kiri,
      foto_kembang_ban_depan_kiri,
      kondisi_kembang_ban_belakang_kanan,
      keterangan_kembang_ban_belakang_kanan,
      foto_kembang_ban_belakang_kanan,
      kondisi_kembang_ban_belakang_kiri,
      keterangan_kembang_ban_belakang_kiri,
      foto_kembang_ban_belakang_kiri
    });

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
