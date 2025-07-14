import express from "express";
import * as absensiController from "../controller/absensiController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/absensi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  absensiController.createAbsensi
);

// router.put(
//   "/absensi/user/:id_user/pulang",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole([1, 2, 3]),
//   absensiController.updateAbsensiPulang
// );

// router.get(
//   "/absensi/user/:id_absensi",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole([1, 2, 3]),
//   absensiController.getAbsensiIdUser
// );

// router.put(
//   "/absensi/user/:id_absensi/istirahat/mulai",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole([1, 2, 3]),
//   absensiController.updateAbsensiIstirahatMulai
// );

// router.put(
//   "/absensi/user/:id_absensi/istirahat/selesai",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole([1, 2, 3]),
//   absensiController.updateAbsensiIstirahatSelsai
// );

// router.put(
//   "/absensi/user/:id_absensi/lembur/mulai",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole([1, 2, 3]),
//   absensiController.updateAbsensiLemburMulai
// );

// router.put(
//   "/absensi/user/:id_absensi/lembur/selesai",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole([1, 2, 3]),
//   absensiController.updateAbsensiLemburSelesai
// );

export default router;
