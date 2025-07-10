import DetailLO from "../models/detailLOModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
const upload = multer();

export const createOrUpdateDetailLO = async (req, res) => {
  try {
    const { id_lo, nomor_sjt = "", id_detail_wo, jumlah_pbp_salur } = req.body;

    if (!id_lo || !id_detail_wo || jumlah_pbp_salur == null) {
      return res.status(400).json({ message: "Data tidak lengkap." });
    }

    // Cek apakah data sudah ada
    const exists = await DetailLO.checkExists(id_lo, id_detail_wo);

    if (exists) {
      // ✅ Update jika sudah ada
      const existingData = await DetailLO.getDetailLOByIdLOAndDetailWO(id_lo, id_detail_wo);

      await DetailLO.updateDetailLO(existingData.id_detail_lo, {
        nomor_sjt,
        jumlah_pbp_salur,
      });

      return res.status(200).json({
        message: "Penyaluran berhasil diupdate.",
        data: { id_detail_lo: existingData.id_detail_lo, updated: true },
      });
    } else {
      // ✅ Insert jika belum ada
      const newId = await DetailLO.createDetailLO({
        id_lo,
        nomor_sjt,
        id_detail_wo,
        jumlah_pbp_salur,
      });

      return res.status(201).json({
        message: "Penyaluran berhasil disimpan.",
        data: { id_detail_lo: newId, created: true },
      });
    }
  } catch (error) {
    console.error("Gagal create/update detail LO:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const getAllDetailLOByIdLO = async (req, res) => {
  try {
    const { id_lo } = req.params;
    const data = await DetailLO.getAllDetailLOByIdLO(id_lo);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllDetailLO = async (req, res) => {
  try {
    const data = await DetailLO.getAllDetailLO();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllDetailLOByIdKantor = async (req, res) => {
  try {
    const { id_kantor } = req.params;
    const data = await DetailLO.getAllDetailLOByIdKantor(id_kantor);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllDetailLOByIdGudang = async (req, res) => {
  try {
    const { id_gudang } = req.params;
    const data = await DetailLO.getAllDetailLOByIdGudang(id_gudang);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const deleteDetailLO = async (req, res) => {
  try {
    const { id_detail_lo } = req.params;
    await DetailLO.deleteDetailLO(id_detail_lo);

    res.status(200).json({
      status: "success",
      message: "Detail LO deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const checkDetailLOByIdLOAndDetailWO = async (req, res) => {
  const { id_lo, id_detail_wo } = req.query;

  if (!id_lo || !id_detail_wo) {
    return res.status(400).json({ message: "id_lo dan id_detail_wo wajib diisi." });
  }

  try {
    const existing = await DetailLO.findOne({
      where: {
        id_lo,
        id_detail_wo,
      },
    });

    return res.status(200).json({ data: existing || null });
  } catch (error) {
    console.error("Error in checkDetailLOByIdLOAndDetailWO:", error);
    return res.status(500).json({ message: "Terjadi kesalahan saat cek detail-lo." });
  }

};

export const updateFotoDetailLO = async (req, res) => {
  const { id_detail_lo } = req.params;

  upload.single("foto")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      nama_alokasi,
      nama_provinsi,
      nama_kabupaten_kota,
      nama_kecamatan,
      nama_desa_kelurahan,
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
      "uploads/detail_lo",
      nama_alokasi,
      nama_provinsi,
      nama_kabupaten_kota,
      nama_kecamatan,
      nama_desa_kelurahan
    );

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `${nama_desa_kelurahan}-BONGKAR-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 1280 })
        .jpeg({ quality: 70 })
        .toFile(filePath);

      const relativePath = filePath.replace(/\\/g, "/");

      // Update path ke database
      await DetailLO.updatePathFotoDetailLO(id_detail_lo, relativePath);
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

export const updateFotoDetailLODokumen = async (req, res) => {
  const { id_detail_lo } = req.params;

  upload.single("foto_dokumen")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      nama_alokasi,
      nama_provinsi,
      nama_kabupaten_kota,
      nama_kecamatan,
      nama_desa_kelurahan,
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
      "uploads/detail_lo",
      nama_alokasi,
      nama_provinsi,
      nama_kabupaten_kota,
      nama_kecamatan,
      nama_desa_kelurahan
    );

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `${nama_desa_kelurahan}-DOKUMEN-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 1280 })
        .jpeg({ quality: 70 })
        .toFile(filePath);

      const relativePath = filePath.replace(/\\/g, "/");

      // Update path ke database
      await DetailLO.updatePathFotoDetailLODokumen(id_detail_lo, relativePath);
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