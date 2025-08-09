import express from "express";
import * as bagianController from "../controller/bagianController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tambah Bagian
router.post(
  "/bagian",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  bagianController.addBagian
);

// Get semua Bagian
router.get(
  "/bagian",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  bagianController.getAllBagian
);

// Get detail Bagian by ID
router.get(
  "/bagian/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  bagianController.getBagianById
);

// Get detail Bagian by ID Bagian
router.get(
  "/bagian/departemen/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  bagianController.getBagianByIdDepartemen
);

// Update Bagian
router.put(
  "/bagian/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  bagianController.updateBagian
);

// Soft Delete Bagian
router.delete(
  "/bagian/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  bagianController.deleteBagian
);

router.post(
  "/bagian/by-departemen",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  bagianController.getBagianByDepartemenMultiple
);

export default router;