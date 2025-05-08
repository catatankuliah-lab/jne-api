import Transaksi from "../models/transaksiModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Setup multer (pakai memory storage karena nanti disimpan manual)
const upload = multer();

export const getAllTransaksi = async (req, res) => {
  try {
    const transaksis = await Transaksi.getAllTransaksi();
    res.status(200).json({
      status: "success",
      data: transaksis,
      message: "Transaksi records fetched successfully."
    });
  } catch (error) {
    console.error("Error fetching Transaksi records:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

export const getTransaksiByIdKasJalan = async (req, res) => {
  const { id_kas_jalan } = req.params;

  try {
    const transaksi = await Transaksi.getTransaksiByIdKasJalan(id_kas_jalan);
    if (transaksi) {
      res.status(200).json({
        status: "success",
        data: transaksi,
        message: "Transaksi fetched successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Transaksi not found."
      });
    }
  } catch (error) {
    console.error("Error fetching Transaksi by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};
export const addTransaksi = (req, res) => {
  upload.single("bukti_transaksi")(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "File bukti_transaksi tidak ditemukan" });

    const { id_kas_jalan, jenis_transaksi, tanggal_transaksi, nominal, nomor_po } = req.body;

    const idKasJalan = id_kas_jalan;
    const uploadPath = "uploads/po/" + tanggal_transaksi + "/" + nomor_po + "/" + idKasJalan + "/";

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const now = new Date();
    const formattedTime = now.toISOString().replace(/[:.]/g, "-");
    const newFileName = `buktitransaksi_${formattedTime}.jpg`;
    
    const filePath = path.join(uploadPath, newFileName);

    fs.writeFile(filePath, req.file.buffer, async (err) => {
      if (err) return res.status(500).json({ error: "Gagal menyimpan file bukti_transaksi" });

      try {
        const buktiPath = uploadPath + newFileName;

        const id_transaksi = await Transaksi.addTransaksi(
          id_kas_jalan,
          jenis_transaksi,
          tanggal_transaksi,
          nominal,
          buktiPath
        );

        res.status(201).json({
          status: "success",
          data: id_transaksi,
          message: "Transaksi created successfully."
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
    });
  });
};

export const updateTransaksi = async (req, res) => {
  const { id_transaksi } = req.params;
  const transaksiData = req.body;

  try {
    const updated = await Transaksi.updateTransaksi(id_transaksi, transaksiData);
    if (updated) {
      res.status(200).json({
        status: "success",
        data: updated,
        message: "Transaksi updated successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Transaksi not found."
      });
    }
  } catch (error) {
    console.error("Error updating Transaksi:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

export const deleteTransaksi = async (req, res) => {
  const { id_transaksi } = req.params;

  try {
    const deleted = await Transaksi.deleteTransaksi(id_transaksi);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Transaksi deleted successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Transaksi not found."
      });
    }
  } catch (error) {
    console.error("Error deleting Transaksi:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Upload Bukti Transaksi
export const uploadTransaksi = async (req, res) => {
  const { id_transaksi } = req.params;
  upload.single("bukti_transaksi")(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    if (!req.file) {
      return res.status(400).json({ error: "File bukti_transaksi tidak ditemukan" });
    }

    const idKasJalan = req.body.id_kas_jalan;
    const nomorPO = req.body.nomor_po;
    const tanggalTransaksi = req.body.tanggal_transaksi;

    const uploadPath = "uploads/po/" + tanggalTransaksi + "/" + nomorPO + "/" + idKasJalan + "/"
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const newFileName = `buktitransaksi.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    fs.writeFile(filePath, req.file.buffer, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Gagal menyimpan file bukti_transaksi" });
      }

      try {
        const buktiPath = uploadPath + "" + newFileName;
        const updated = await Transaksi.uploadBuktiTransaksi(id_transaksi, buktiPath);
        res.status(200).json({
          status: "success",
          data: updated,
          message: "Bukti transaksi uploaded and updated successfully."
        });
      } catch (error) {
        console.error("Error updating bukti transaksi:", error);
        res.status(500).json({
          status: "error",
          message: "Internal Server Error"
        });
      }
    });
  });
};
