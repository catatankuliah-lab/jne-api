import CutiIzin from "../models/cutiIzinModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
export const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// Tambah CutiIzin
export const addCutiIzin = async (req, res) => {
  upload.single("lampiran_cuti_izin")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload gagal", error: err.message });
    }

    let filePath = null;

    if (req.file) {
      const { id_karyawan, tanggal_mulai } = req.body;
      const tanggalFolder =
        tanggal_mulai || new Date().toISOString().split("T")[0];

      const uploadDir = path.join(
        "uploads/cuti_izin",
        id_karyawan,
        tanggalFolder
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `lampiran-${Date.now()}.jpg`;
      const fullPath = path.join(uploadDir, fileName);

      try {
        await sharp(req.file.buffer)
          .resize({
            width: 800,
            height: 1200,
            fit: "inside",
          })
          .jpeg({ quality: 80 })
          .toFile(fullPath);

        filePath = fullPath.replace(/\\/g, "/");
      } catch (e) {
        return res
          .status(500)
          .json({ message: "Gagal memproses file", error: e.message });
      }
    }

    try {
      const data = {
        ...req.body,
        lampiran_cuti_izin: filePath,
        is_deleted: 0,
      };

      const result = await CutiIzin.addCutiIzin(data);
      res
        .status(201)
        .json({ message: "Cuti izin berhasil ditambahkan", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal menambahkan cuti izin", error: error.message });
    }
  });
};

// Get Semua CutiIzin
export const getAllCutiIzin = async (req, res) => {
  const { jenis = [], status = [], id_karyawan = [] } = req.body;

  try {
    const result = await CutiIzin.getAllCutiIzin({
      jenis,
      status,
      id_karyawan,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data cuti izin",
      error: error.message,
    });
  }
};

// Get Detail CutiIzin by ID
export const getCutiIzinById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CutiIzin.getCutiIzinById(id);

    if (!result) {
      return res.status(404).json({ message: "CutiIzin tidak ditemukan" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail cuti izin",
      error: error.message,
    });
  }
};

// Update Cuti/Izin dengan kemungkinan ganti lampiran
export const updateCutiIzin = async (req, res) => {
  upload.single("lampiran_cuti_izin")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload gagal", error: err.message });
    }

    const { id } = req.params;

    try {
      // Ambil data existing supaya tahu path lama
      const existing = await CutiIzin.getCutiIzinById(id);
      if (!existing) {
        return res.status(404).json({ message: "Cuti/Izin tidak ditemukan." });
      }

      const updateData = {
        id_karyawan: req.body.id_karyawan,
        tanggal_mulai: req.body.tanggal_mulai,
        tanggal_selesai: req.body.tanggal_selesai,
        jenis: req.body.jenis,
        alasan: req.body.alasan,
        status: req.body.status,
        disetujui_oleh: req.body.disetujui_oleh,
        updated_by: req.body.updated_by,
      };

      // Jika ada file baru, proses dan hapus file lama
      if (req.file) {
        const { id_karyawan, tanggal_mulai } = req.body;
        const tanggalFolder =
          tanggal_mulai || new Date().toISOString().split("T")[0];

        const uploadDir = path.join(
          "uploads",
          "cuti_izin",
          `${id_karyawan}`,
          tanggalFolder
        );
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = `lampiran-${Date.now()}.jpg`;
        const fullPath = path.join(uploadDir, fileName);

        try {
          await sharp(req.file.buffer)
            .resize({
              width: 800,
              height: 1200,
              fit: "inside",
            })
            .jpeg({ quality: 80 })
            .toFile(fullPath);
        } catch (e) {
          return res
            .status(500)
            .json({ message: "Gagal memproses file", error: e.message });
        }

        const newFilePath = fullPath.replace(/\\/g, "/");
        updateData.lampiran_cuti_izin = newFilePath;

        // Hapus file lama kalau ada dan beda dengan yang baru
        if (existing.lampiran_cuti_izin) {
          try {
            const oldPath = path.isAbsolute(existing.lampiran_cuti_izin)
              ? existing.lampiran_cuti_izin
              : path.join(process.cwd(), existing.lampiran_cuti_izin);
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          } catch (e) {
            console.warn("Gagal menghapus lampiran lama:", e.message);
            // tidak menggagalkan update karena file baru sudah diproses
          }
        }
      }

      await CutiIzin.updateCutiIzin(id, updateData);
      const updated = await CutiIzin.getCutiIzinById(id);
      res.status(200).json({
        message: "Cuti/Izin berhasil diperbarui.",
        data: updated,
      });
    } catch (error) {
      console.error("Error saat memperbarui cuti izin:", error);
      res.status(500).json({
        message: "Gagal memperbarui cuti izin.",
        error: error.message,
      });
    }
  });
};
// Soft Delete CutiIzin
export const deleteCutiIzin = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await CutiIzin.deleteCutiIzin(id);
    res
      .status(200)
      .json({ message: "CutiIzin berhasil dihapus (soft delete)", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus cuti izin", error: error.message });
  }
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
        koordinat_lembur_selesai,
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
