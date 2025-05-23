import express from "express";
import * as kendaraanMasukController from "../controller/kendaraanmasukController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes for Kendaraan Masuk with authentication and authorization
router.get(
  "/kendaraanmasuk",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10, 15, 16]),
  kendaraanMasukController.getAllKendaraanMasuk
);

router.get(
  "/kendaraanmasuk/:id_kendaraan_masuk",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10, 13, 15, 16]),
  kendaraanMasukController.getKendaraanMasukById
);

router.post(
  "/kendaraanmasuk",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10, 15, 16]),
  kendaraanMasukController.addKendaraanMasuk
);

router.put(
  "/kendaraanmasuk/:id_kendaraan_masuk",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10, 15, 16]),
  kendaraanMasukController.updateKendaraanMasuk
);

router.delete(
  "/kendaraanmasuk/:id_kendaraan_masuk",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10, 15, 16]),
  kendaraanMasukController.deleteKendaraanMasuk
);

// Routes for development (without authentication and authorization)
router.get("/dev/kendaraanmasuk", kendaraanMasukController.getAllKendaraanMasuk);
router.get("/dev/kendaraanmasuk/:id_kendaraan_masuk", kendaraanMasukController.getKendaraanMasukById);
router.post("/dev/kendaraanmasuk", kendaraanMasukController.addKendaraanMasuk);
router.put("/dev/kendaraanmasuk/:id_kendaraan_masuk", kendaraanMasukController.updateKendaraanMasuk);
router.delete("/dev/kendaraanmasuk/:id_kendaraan_masuk", kendaraanMasukController.deleteKendaraanMasuk);

export default router;
