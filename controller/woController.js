import Wo from "../models/woModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

export const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

export const createWo = async (req, res) => {
  const { nomor_wo, tanggal_muat, tanggal_distribusi, id_kantor, id_gudang, id_pic, id_alokasi } = req.body;

  try {
    const woData = {
      nomor_wo,
      tanggal_muat,
      tanggal_distribusi,
      id_kantor,
      id_gudang,
      id_pic,
      id_alokasi,
    };

    const id_wo = await Wo.addWo(woData);

    res.status(201).json({
      status: "success",
      data: { id_wo, ...woData },
      message: "WO created successfully.",
    });
  } catch (error) {
    console.error("Error creating WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getAllWo = async (req, res) => {
  try {
    const data = await Wo.getAllWo();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getWoById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Wo.getWoById(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "WO not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getWoByIdKantor = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Wo.getWoByIdKantor(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "WO not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getWoByIdGudang = async (req, res) => {
  const { id, id_alokasi} = req.params;

  try {
    const data = await Wo.getWoByIdGudang(id, id_alokasi);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "WO not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const updateWo = async (req, res) => {
  const { id } = req.params;
  const { nomor_wo, tanggal_muat, tanggal_distribusi, id_kantor, id_gudang, id_pic, id_alokasi } = req.body;

  try {
    const woData = {
      nomor_wo,
      tanggal_muat,
      tanggal_distribusi,
      id_kantor,
      id_gudang,
      id_pic,
      id_alokasi,
    };

    await Wo.updateWo(id, woData);

    res.status(200).json({
      status: "success",
      message: "WO updated successfully.",
    });
  } catch (error) {
    console.error("Error updating WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const deleteWo = async (req, res) => {
  const { id } = req.params;

  try {
    await Wo.deleteWo(id);

    res.status(200).json({
      status: "success",
      message: "WO deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const uploadScanDokumenDO = async (req, res) => {
  const { id_wo } = req.params;

  upload.single("scan_dokumendo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      nomor_wo
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
      "uploads/dokumen/do",
    );

    try {
      // Buat folder jika belum ada
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      // Simpan file PDF langsung
      const newFileName = `DO-${nomor_wo}-${nomor_urut}.pdf`;
      const filePath = path.join(uploadPath, newFileName);
      fs.writeFileSync(filePath, req.file.buffer);

      const relativePath = filePath.replace(/\\/g, "/");

      // Simpan path ke DB
      await Wo.uploadScanDokumenDO(id_wo, relativePath);

      return res.status(200).json({
        status: "success",
        message: "File PDF berhasil diupload.",
        url_hasil: relativePath,
      });
    } catch (err) {
      console.error("Gagal simpan file PDF:", err);
      return res.status(500).json({ error: "Gagal menyimpan file PDF" });
    }
  });
};
