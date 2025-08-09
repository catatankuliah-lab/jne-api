import express from "express";
import * as departemenController from "../controller/departemenController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tambah Departemen
router.post(
  "/departemen",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  departemenController.addDepartemen
);

// Get semua Departemen
router.get(
  "/departemen",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  departemenController.getAllDepartemen
);

// Get detail Departemen by ID
router.get(
  "/departemen/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  departemenController.getDepartemenById
);

// Update Departemen
router.put(
  "/departemen/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  departemenController.updateDepartemen
);

// Soft Delete Departemen
router.delete(
  "/departemen/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  departemenController.deleteDepartemen
);

export default router;