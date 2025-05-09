import ItemDetailArmada from "../models/itemdetailarmadaModel.js";
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
  const { id_item_detail_armada, namafile } = req.params;

  console.log(req.params);
  upload.single(namafile)(req, res, async (err) => {

    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }
    const nopol_armada = req.body.nopol_armada;
    const nama_driver = req.body.nama_driver;
    const kondisi = req.body.kondisi;
    const keterangan = req.body.keterangan;
    const today = new Date();
    const tanggal = today.getDate();
    const bulan = today.toLocaleString('id-ID', { month: 'long' });
    const tahun = today.getFullYear();
    const uploadPath = "uploads/pengecekan_armada/" + tahun + "/" + bulan + "/" + tanggal + "/" + nopol_armada + " - " + nama_driver + "/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    // Tentukan nama file baru
    const newFileName = `${namafile}.jpg`;
    const filePath = path.join(uploadPath, newFileName);
    // Simpan file dari buffer ke disk dengan nama yang diinginkan
    fs.writeFile(filePath, req.file.buffer, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Gagal menyimpan file" });
      }
      try {
        const fileFoto = uploadPath + "" + newFileName;
        const listKeySaja = Object.keys(Object.assign({}, req.body));
        const filteredKeys = listKeySaja.filter(
          key => key !== 'nama_driver' && key !== 'nopol_armada'
        );
        filteredKeys.unshift(namafile);
        const valuesOnly = Object.values(req.body);
        const filteredValues = valuesOnly.slice(0, -2);
        filteredValues.unshift(fileFoto);
        const dataUpdate = {};
        filteredKeys.forEach((key, index) => {
          dataUpdate[key] = filteredValues[index];
        });
        const updatePengecekanArmada = await ItemDetailArmada.uploadItemDetailArmada(id_item_detail_armada, dataUpdate);
        res.status(200).json({
          status: "success",
          data: updatePengecekanArmada,
          message: "Foto lampiran updated successfully.",
        });
      } catch (error) {
        console.error("Error updating LO:", error);
        res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
    });
  });
};