import ItemDetailArmada from "../models/itemDetailArmadaModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
const upload = multer();

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

export const uploadItemDetailArmada = async (req, res) => {
  const { id_item_detail_armada } = req.params;
  // const foto = req.body;
  const { kondisi_mobil_tampak_depan, keterangan_mobil_tampak_depan } = req.body;
  console.log("id",id_item_detail_armada);
  console.log("coba",kondisi_mobil_tampak_depan, keterangan_mobil_tampak_depan);
  // upload.single(req.body.foto)(req, res, async (err) => {

  //   if (err) {
  //     return res.status(400).json({ error: err.message });
  //   }

  //   if (!req.file) {
  //     return res.status(400).json({ error: "File tidak ditemukan" });
  //   }

    // const nomorPO = req.body.nomor_po;
    // const tanggalPO = req.body.tanggal_po;
    // if (!nomorPO) {
    //   return res.status(400).json({ error: "Nomor PO tidak ditemukan" });
    // }

    // Tentukan lokasi penyimpanan
  //   const uploadPath = "uploads/";
  //   if (!fs.existsSync(uploadPath)) {
  //     fs.mkdirSync(uploadPath, { recursive: true });
  //   }

  //   // Tentukan nama file baru
  //   const newFileName = `itemdetail.jpg`;
  //   const filePath = path.join(uploadPath, newFileName);

  //   // Simpan file dari buffer ke disk dengan nama yang diinginkan
  //   fs.writeFile(filePath, req.file.buffer, async (err) => {
  //     if (err) {
  //       return res.status(500).json({ error: "Gagal menyimpan file" });
  //     }
  //     try {
  //       // Update database dengan nama file baru
  //       const fileFoto = uploadPath + "" + newFileName;
  //       const updateItemDetailArmada = await ItemDetailArmada.uploadItemDetailArmada(id_item_detail_armada, fileFoto);
  //       res.status(200).json({
  //         status: "success",
  //         data: updateItemDetailArmada,
  //         message: "Item Detail Armada updated successfully.",
  //       });
  //     } catch (error) {
  //       console.error("Error updating Item Detail Armada:", error);
  //       res.status(500).json({
  //         status: "error",
  //         message: "Internal Server Error",
  //       });
  //     }
  //   });
  // });
};