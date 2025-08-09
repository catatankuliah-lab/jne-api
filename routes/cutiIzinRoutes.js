import express from "express";
import * as cutiIzinController from "../controller/cutiIzinController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tambah CutiIzin
router.post(
  "/cuti-izin",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  cutiIzinController.addCutiIzin
);

// Get semua CutiIzin
router.post(
  "/cuti-izin/filters",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  cutiIzinController.getAllCutiIzin
);

// Get detail CutiIzin by ID
router.get(
  "/cuti-izin/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  cutiIzinController.getCutiIzinById
);

// Update CutiIzin
router.put(
  "/cuti-izin/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  cutiIzinController.updateCutiIzin
);

// Soft Delete CutiIzin
router.delete(
  "/cuti-izin/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  cutiIzinController.deleteCutiIzin
);

export default router;