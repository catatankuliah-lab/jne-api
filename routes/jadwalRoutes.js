import express from "express";
import * as jadwalController from "../controller/jadwalController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tambah banyak jadwal (bulk)
router.post(
  "/jadwal-shift/bulk",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  jadwalController.addBulkJadwal
);

// Ambil jadwal berdasarkan id_karyawan, tanggal, bulan, dan tahun
router.get(
  "/jadwal-shift/:id_karyawan/:tanggal/:bulan/:tahun",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  jadwalController.getJadwalByKaryawanAndTanggal
);

export default router;