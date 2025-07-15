import AbsensiUser from "../models/absensiModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
export const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

export const createAbsensi = async (req, res) => {
  const { id_user, tanggal } = req.body;

  console.log(id_user, tanggal);

  try {
    const absensiData = {
      id_user,
      tanggal,
    };
    const id_absensi = await AbsensiUser.createAbsensi(absensiData);

    res.status(201).json({
      status: "success",
      data: { id_absensi, ...absensiData },
      message: "Absensi created successfully.",
    });
  } catch (error) {
    console.error("Error creating Absensi:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAbsensiHariIni = async (req, res) => {
  const { id_user, tanggal } = req.params;

  try {
    const data = await AbsensiUser.getAbsensiHariIni(id_user, tanggal);
    if (!data) {
      return res.status(200).json({
        status: "success",
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching Absensi:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const updateAbsensiMasuk = async (req, res) => {
  const { id_absensi } = req.params;

  console.log(id_absensi);

  upload.single("foto")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      jam_masuk,
      koordinat_masuk,
      nama_kantor,
      nama_gudang,
      nama_lengkap,
      tanggal,
    } = req.body;

    // Generate nomor_urut dari timestamp
    const now = new Date();
    const nomor_urut =
      now.getFullYear().toString() +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2) +
      ("0" + now.getHours()).slice(-2) +
      ("0" + now.getMinutes()).slice(-2) +
      ("0" + now.getSeconds()).slice(-2);

    const uploadPath = path.join(
      "uploads/absensi",
      nama_kantor,
      nama_gudang,
      tanggal
    );

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `${nama_lengkap}-MASUK-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 600 })
        .jpeg({ quality: 70 })
        .toFile(filePath);
      const relativePath = filePath.replace(/\\/g, "/");

      const absensiData = {
        jam_masuk,
        foto_masuk: relativePath,
        koordinat_masuk
      };

      // Update path ke database
      await AbsensiUser.updateAbsensi(id_absensi, absensiData);
      return res.status(200).json({
        status: "success",
        message: "File berhasil diupload & dikompres.",
        data: absensiData,
      });
    } catch (err) {
      console.error("Gagal resize/compress:", err);
      return res.status(500).json({ error: "Gagal memproses file" });
    }
  });
};

export const updateAbsensiIstirahatMulai = async (req, res) => {
  const { id_absensi } = req.params;

  console.log(id_absensi);

  upload.single("foto")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      jam_istirahat_mulai,
      koordinat_istirahat_mulai,
      nama_kantor,
      nama_gudang,
      nama_lengkap,
      tanggal,
    } = req.body;

    // Generate nomor_urut dari timestamp
    const now = new Date();
    const nomor_urut =
      now.getFullYear().toString() +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2) +
      ("0" + now.getHours()).slice(-2) +
      ("0" + now.getMinutes()).slice(-2) +
      ("0" + now.getSeconds()).slice(-2);

    const uploadPath = path.join(
      "uploads/absensi",
      nama_kantor,
      nama_gudang,
      tanggal
    );

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `${nama_lengkap}-ISTIRAHAT MULAI-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 600 })
        .jpeg({ quality: 70 })
        .toFile(filePath);
      const relativePath = filePath.replace(/\\/g, "/");

      const absensiData = {
        jam_istirahat_mulai,
        foto_istirahat_mulai: relativePath,
        koordinat_istirahat_mulai
      };

      // Update path ke database
      await AbsensiUser.updateAbsensi(id_absensi, absensiData);
      return res.status(200).json({
        status: "success",
        message: "File berhasil diupload & dikompres.",
        data: absensiData,
      });
    } catch (err) {
      console.error("Gagal resize/compress:", err);
      return res.status(500).json({ error: "Gagal memproses file" });
    }
  });
};
export const updateAbsensiIstirahatSelesai = async (req, res) => {
  const { id_absensi } = req.params;

  console.log(id_absensi);

  upload.single("foto")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      jam_istirahat_selesai,
      koordinat_istirahat_selesai,
      nama_kantor,
      nama_gudang,
      nama_lengkap,
      tanggal,
    } = req.body;

    // Generate nomor_urut dari timestamp
    const now = new Date();
    const nomor_urut =
      now.getFullYear().toString() +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2) +
      ("0" + now.getHours()).slice(-2) +
      ("0" + now.getMinutes()).slice(-2) +
      ("0" + now.getSeconds()).slice(-2);

    const uploadPath = path.join(
      "uploads/absensi",
      nama_kantor,
      nama_gudang,
      tanggal
    );

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `${nama_lengkap}-ISTIRAHAT SELESAI-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 600 })
        .jpeg({ quality: 70 })
        .toFile(filePath);
      const relativePath = filePath.replace(/\\/g, "/");

      const absensiData = {
        jam_istirahat_selesai,
        foto_istirahat_selesai: relativePath,
        koordinat_istirahat_selesai
      };

      // Update path ke database
      await AbsensiUser.updateAbsensi(id_absensi, absensiData);
      return res.status(200).json({
        status: "success",
        message: "File berhasil diupload & dikompres.",
        data: absensiData,
      });
    } catch (err) {
      console.error("Gagal resize/compress:", err);
      return res.status(500).json({ error: "Gagal memproses file" });
    }
  });
};
export const updateAbsensiKeluar = async (req, res) => {
  const { id_absensi } = req.params;

  console.log(id_absensi);

  upload.single("foto")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      jam_keluar,
      koordinat_keluar,
      nama_kantor,
      nama_gudang,
      nama_lengkap,
      tanggal,
    } = req.body;

    // Generate nomor_urut dari timestamp
    const now = new Date();
    const nomor_urut =
      now.getFullYear().toString() +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2) +
      ("0" + now.getHours()).slice(-2) +
      ("0" + now.getMinutes()).slice(-2) +
      ("0" + now.getSeconds()).slice(-2);

    const uploadPath = path.join(
      "uploads/absensi",
      nama_kantor,
      nama_gudang,
      tanggal
    );

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `${nama_lengkap}-PULANG-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 600 })
        .jpeg({ quality: 70 })
        .toFile(filePath);
      const relativePath = filePath.replace(/\\/g, "/");

      const absensiData = {
        jam_keluar,
        foto_keluar: relativePath,
        koordinat_keluar
      };

      // Update path ke database
      await AbsensiUser.updateAbsensi(id_absensi, absensiData);
      return res.status(200).json({
        status: "success",
        message: "File berhasil diupload & dikompres.",
        data: absensiData,
      });
    } catch (err) {
      console.error("Gagal resize/compress:", err);
      return res.status(500).json({ error: "Gagal memproses file" });
    }
  });
};
export const updateAbsensiLemburMulai = async (req, res) => {
  const { id_absensi } = req.params;

  console.log(id_absensi);

  upload.single("foto")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      jam_lembur_mulai,
      koordinat_lembur_mulai,
      nama_kantor,
      nama_gudang,
      nama_lengkap,
      tanggal,
    } = req.body;

    // Generate nomor_urut dari timestamp
    const now = new Date();
    const nomor_urut =
      now.getFullYear().toString() +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2) +
      ("0" + now.getHours()).slice(-2) +
      ("0" + now.getMinutes()).slice(-2) +
      ("0" + now.getSeconds()).slice(-2);

    const uploadPath = path.join(
      "uploads/absensi",
      nama_kantor,
      nama_gudang,
      tanggal
    );

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `${nama_lengkap}-LEMBUR MULAI-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 600 })
        .jpeg({ quality: 70 })
        .toFile(filePath);
      const relativePath = filePath.replace(/\\/g, "/");

      const absensiData = {
        jam_lembur_mulai,
        foto_lembur_mulai: relativePath,
        koordinat_lembur_mulai
      };

      // Update path ke database
      await AbsensiUser.updateAbsensi(id_absensi, absensiData);
      return res.status(200).json({
        status: "success",
        message: "File berhasil diupload & dikompres.",
        data: absensiData,
      });
    } catch (err) {
      console.error("Gagal resize/compress:", err);
      return res.status(500).json({ error: "Gagal memproses file" });
    }
  });
};
export const updateAbsensiLemburSelesai = async (req, res) => {
  const { id_absensi } = req.params;

  console.log(id_absensi);

  upload.single("foto")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const {
      jam_lembur_selesai,
      koordinat_lembur_selesai,
      nama_kantor,
      nama_gudang,
      nama_lengkap,
      tanggal,
    } = req.body;

    // Generate nomor_urut dari timestamp
    const now = new Date();
    const nomor_urut =
      now.getFullYear().toString() +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2) +
      ("0" + now.getHours()).slice(-2) +
      ("0" + now.getMinutes()).slice(-2) +
      ("0" + now.getSeconds()).slice(-2);

    const uploadPath = path.join(
      "uploads/absensi",
      nama_kantor,
      nama_gudang,
      tanggal
    );

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `${nama_lengkap}-LEMBUR MULAI-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 600 })
        .jpeg({ quality: 70 })
        .toFile(filePath);
      const relativePath = filePath.replace(/\\/g, "/");

      const absensiData = {
        jam_lembur_selesai,
        foto_lembur_selesai: relativePath,
        koordinat_lembur_selesai
      };

      // Update path ke database
      await AbsensiUser.updateAbsensi(id_absensi, absensiData);
      return res.status(200).json({
        status: "success",
        message: "File berhasil diupload & dikompres.",
        data: absensiData,
      });
    } catch (err) {
      console.error("Gagal resize/compress:", err);
      return res.status(500).json({ error: "Gagal memproses file" });
    }
  });
};
