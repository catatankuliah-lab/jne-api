import express from "express";
import * as absensiController from "../controller/absensiController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post(
//   "/absensiiiiiiii",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole([1, 2, 3, 4]),
//   absensiController.createAbsensi
// );

router.post(
  "/absensi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.createAbsensi
);

router.get(
  "/absensi/user/:id_user/hariini/:tanggal",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.getAbsensiHariIni
);

router.put(
  "/absensi/masuk/:id_absensi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.updateAbsensiMasuk
);

router.put(
  "/absensi/istirahatmulai/:id_absensi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.updateAbsensiIstirahatMulai
);

router.put(
  "/absensi/istirahatselesai/:id_absensi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.updateAbsensiIstirahatSelesai
);

router.put(
  "/absensi/keluar/:id_absensi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.updateAbsensiKeluar
);

router.put(
  "/absensi/lemburmulai/:id_absensi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.updateAbsensiLemburMulai
);

router.put(
  "/absensi/lemburselesai/:id_absensi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  absensiController.updateAbsensiLemburSelesai
);

export default router;
