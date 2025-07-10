import { isColString } from "sequelize/lib/utils";
import Lo from "../models/loModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
const upload = multer();

export const createLo = async (req, res) => {
  const { 
    id_alokasi ,id_wo ,id_checker ,nomor_lo ,tanggal_lo ,nopol ,driver ,telpon_driver ,nomor_do ,nomor_sjt_bulog ,status_lo
   } = req.body;

  try {
    const loData = { 
       id_alokasi ,id_wo ,id_checker ,nomor_lo ,tanggal_lo ,nopol ,driver ,telpon_driver ,nomor_do ,nomor_sjt_bulog ,status_lo
    };
    const id_lo = await Lo.addLo(loData);

    res.status(201).json({
      status: "success",
      data: { id_lo, ...loData },
      message: "LO created successfully.",
    });
  } catch (error) {
    console.error("Error creating LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllLo = async (req, res) => {
  try {
    const data = await Lo.getAllLo();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.error("Error fetching LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getLoById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Lo.getLoById(id);

    if (!data) {
      return res.status(404).json({ status: "error", message: "LO not found" });
    }

    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.error("Error fetching LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getLoByIdKantor = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Lo.getLoByIdKantor(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "LO not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getLoByIdGudang = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Lo.getLoByIdGudang(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "LO not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const updateLo = async (req, res) => {
  const { id } = req.params;
  const { id_alokasi ,id_wo ,id_checker ,nomor_lo ,tanggal_lo ,nopol ,driver ,telpon_driver ,nomor_do ,nomor_sjt_bulog ,status_lo } = req.body;

  try {
    const loData = { id_alokasi ,id_wo ,id_checker ,nomor_lo ,tanggal_lo ,nopol ,driver ,telpon_driver ,nomor_do ,nomor_sjt_bulog ,status_lo };
    await Lo.updateLo(id, loData);

    res.status(200).json({ status: "success", message: "LO updated successfully." });
  } catch (error) {
    console.error("Error updating LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const deleteLo = async (req, res) => {
  const { id } = req.params;

  try {
    await Lo.deleteLo(id);
    res.status(200).json({ status: "success", message: "LO deleted successfully." });
  } catch (error) {
    console.error("Error deleting LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const updateLODokumen = async (req, res) => {
  const { id_lo } = req.params;

  upload.single("foto_lo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      nama_alokasi,
      nama_kantor,
      nama_gudang,
      tanggal_lo
    } = req.body;

    // Generate nomor_urut dari timestamp
    const now = new Date();
    const nomor_urut = now.getFullYear().toString()
      + ("0" + (now.getMonth() + 1)).slice(-2)
      + ("0" + now.getDate()).slice(-2)
      + ("0" + now.getHours()).slice(-2)
      + ("0" + now.getMinutes()).slice(-2)
      + ("0" + now.getSeconds()).slice(-2);


    const uploadPath = path.join(
      "uploads/lo",
      nama_alokasi,
      nama_kantor,
      nama_gudang,
      tanggal_lo,
    );

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `LO-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 1280 })
        .jpeg({ quality: 70 })
        .toFile(filePath);

      const relativePath = filePath.replace(/\\/g, "/");

      // Update path ke database
      await Lo.updateLODokumen(id_lo, relativePath);
      return res.status(200).json({
        status: "success",
        message: "File berhasil diupload & dikompres.",
        foto_url: relativePath,
      });
    } catch (err) {
      console.error("Gagal resize/compress:", err);
      return res.status(500).json({ error: "Gagal memproses file" });
    }
  });
};
