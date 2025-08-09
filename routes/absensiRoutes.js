import express from "express";
import * as absensiController from "../controller/absensiController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/absensi-masuk",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.addAbsensiMasuk
);

router.put(
  "/absensi-pulang/:id_absensi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.addAbsensiPulang
);

router.get(
  "/absensi-cek/:id_karyawan/:tanggal",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.cekAbsensiHariIni
);

export default router;