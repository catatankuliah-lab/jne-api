import express from "express";
import * as karyawanController from "../controller/karyawanController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tambah Karyawan
router.post(
  "/karyawan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  karyawanController.addKaryawan
);

// Get semua Karyawan
router.post(
  "/karyawan/filters",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  karyawanController.getAllKaryawan
);

// Get detail Karyawan by ID
router.get(
  "/karyawan/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  karyawanController.getKaryawanById
);

// Update Karyawan
router.put(
  "/karyawan/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  karyawanController.updateKaryawan
);

// Soft Delete Bagian
router.delete(
  "/karyawan/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  karyawanController.deleteKaryawan
);

export default router;