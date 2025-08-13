import Absensi from "../models/absensiModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
export const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

export const addAbsensiMasuk = async (req, res) => {
  upload.single("foto_masuk")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload gagal", error: err.message });
    }

    let fotoPath = null;

    if (req.file) {
      const { id_karyawan, tanggal } = req.body;
      const tanggalFolder = tanggal || new Date().toISOString().split("T")[0];

      const uploadDir = path.join(
        "uploads/absensi/masuk",
        id_karyawan,
        tanggalFolder
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `absen-masuk-${Date.now()}.jpg`;
      const fullPath = path.join(uploadDir, fileName);

      try {
        await sharp(req.file.buffer)
          .resize({ width: 600, height: 800, fit: "inside" })
          .jpeg({ quality: 80 })
          .toFile(fullPath);

        fotoPath = fullPath.replace(/\\/g, "/");
      } catch (e) {
        return res
          .status(500)
          .json({ message: "Gagal memproses file", error: e.message });
      }
    }

    try {
      const {
        id_karyawan,
        tanggal,
        jam_masuk,
        lokasi_masuk_lat,
        lokasi_masuk_long,
        keterangan_masuk,
        created_by,
      } = req.body;

      const data = {
        id_karyawan,
        tanggal,
        jam_masuk,
        foto_masuk: fotoPath,
        lokasi_masuk_lat,
        lokasi_masuk_long,
        keterangan_masuk,
        created_at: new Date(),
        created_by,
      };

      const result = await Absensi.addAbsensiMasuk(data);
      res.status(201).json({ message: "Absen masuk berhasil", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal absen masuk", error: error.message });
    }
  });
};

export const cekAbsensiHariIni = async (req, res) => {
  try {
    const { id_karyawan, tanggal } = req.params;

    // Query model
    const absensi = await Absensi.cekAbsensiHariIni(id_karyawan, tanggal);

    if (absensi) {
      return res.status(200).json({
        status: true,
        message: "Karyawan sudah melakukan absensi di tanggal ini",
        data: absensi,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Belum ada absensi di tanggal ini",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Gagal mengecek absensi",
      error: error.message,
    });
  }
};

export const addAbsensiPulang = async (req, res) => {
  upload.single("foto_pulang")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload gagal", error: err.message });
    }

    let fotoPath = null;

    if (req.file) {
      const { id_karyawan, tanggal_pulang } = req.body;
      const tanggalFolder =
        tanggal_pulang || new Date().toISOString().split("T")[0];

      const uploadDir = path.join(
        "uploads/absensi/pulang",
        id_karyawan,
        tanggalFolder
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `absen-pulang-${Date.now()}.jpg`;
      const fullPath = path.join(uploadDir, fileName);

      try {
        await sharp(req.file.buffer)
          .resize({ width: 600, height: 800, fit: "inside" })
          .jpeg({ quality: 80 })
          .toFile(fullPath);

        fotoPath = fullPath.replace(/\\/g, "/");
      } catch (e) {
        return res
          .status(500)
          .json({ message: "Gagal memproses file", error: e.message });
      }
    }

    try {
      const { id_absensi } = req.params;

      const {
        jam_pulang,
        lokasi_pulang_lat,
        lokasi_pulang_long,
        keterangan_pulang,
        tanggal_pulang,
        updated_by,
      } = req.body;

      const data = {
        jam_pulang,
        foto_pulang: fotoPath,
        lokasi_pulang_lat,
        lokasi_pulang_long,
        keterangan_pulang,
        tanggal_pulang,
        updated_at: new Date(),
        updated_by,
      };

      const result = await Absensi.updateAbsensiPulang(id_absensi, data);

      res.status(200).json({ message: "Absen pulang berhasil", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal absen pulang", error: error.message });
    }
  });
};

export const getAbsensiByBulanTahun = async (req, res) => {
  try {
    console.log("REQ PARAMS:", req.params);

    const { id_karyawan, bulan, tahun } = req.params;

    if (!id_karyawan || !bulan || !tahun) {
      return res.status(400).json({ message: "id_karyawan, bulan, dan tahun wajib diisi" });
    }

    const data = await Absensi.getAbsensiByBulanTahun(id_karyawan, parseInt(bulan), parseInt(tahun));

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error di getAbsensiByBulanTahun controller:", error);
    return res.status(500).json({
      status: "error",
      message: "Gagal mengambil data absensi",
      error: error.message,
    });
  }
};