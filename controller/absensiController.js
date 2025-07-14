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
  upload.single("foto")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const { id_user, tanggal, jam_masuk, koordinat_masuk } = req.body;

    // Generate nomor_urut dari timestamp
    const now = new Date();
    const nomor_urut =
      now.getFullYear().toString() +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2) +
      ("0" + now.getHours()).slice(-2) +
      ("0" + now.getMinutes()).slice(-2) +
      ("0" + now.getSeconds()).slice(-2);

    const uploadPath = path.join("uploads/absensi");

    // Cek & buat folder kalau belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file dan path
    const newFileName = `ABSENSI-${nomor_urut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    try {
      await sharp(req.file.buffer)
        .resize({ width: 400, height: 600 })
        .jpeg({ quality: 70 })
        .toFile(filePath);

      const relativePath = filePath.replace(/\\/g, "/");

      const absensiData = {
        id_user,
        tanggal,
        jam_masuk,
        foto_masuk: relativePath,
        koordinat_masuk,
      };

      // Update path ke database
      await AbsensiUser.createAbsensi(absensiData);
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

// export const updateFotoDetailLO = async (req, res) => {
//   const { id_detail_lo } = req.params;

//   upload.single("foto")(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: "File tidak ditemukan" });
//     }

//     const {
//       nama_alokasi,
//       nama_provinsi,
//       nama_kabupaten_kota,
//       nama_kecamatan,
//       nama_desa_kelurahan,
//     } = req.body;

//     // Generate nomor_urut dari timestamp
//     const now = new Date();
//     const nomor_urut = now.getFullYear().toString()
//       + ("0" + (now.getMonth() + 1)).slice(-2)
//       + ("0" + now.getDate()).slice(-2)
//       + ("0" + now.getHours()).slice(-2)
//       + ("0" + now.getMinutes()).slice(-2)
//       + ("0" + now.getSeconds()).slice(-2);

//     const uploadPath = path.join(
//       "uploads/detail_lo",
//       nama_alokasi,
//       nama_provinsi,
//       nama_kabupaten_kota,
//       nama_kecamatan,
//       nama_desa_kelurahan
//     );

//     // Cek & buat folder kalau belum ada
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     // Tentukan nama file dan path
//     const newFileName = `${nama_desa_kelurahan}-BONGKAR-${nomor_urut}.jpg`;
//     const filePath = path.join(uploadPath, newFileName);

//     try {
//       await sharp(req.file.buffer)
//         .resize({ width: 1280 })
//         .jpeg({ quality: 70 })
//         .toFile(filePath);

//       const relativePath = filePath.replace(/\\/g, "/");

//       // Update path ke database
//       await AbsensiUser.updatePathFotoDetailLO(id_detail_lo, relativePath);
//       return res.status(200).json({
//         status: "success",
//         message: "File berhasil diupload & dikompres.",
//         foto_url: relativePath,
//       });
//     } catch (err) {
//       console.error("Gagal resize/compress:", err);
//       return res.status(500).json({ error: "Gagal memproses file" });
//     }
//   });
// };
