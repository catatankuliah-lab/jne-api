import express from "express";
import * as kantorController from "../controller/kantorController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tambah Kantor
router.post(
  "/kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  kantorController.addKantor
);

// Get semua Kantor
router.get(
  "/kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  kantorController.getAllKantor
);

// Get detail Kantor by ID
router.get(
  "/kantor/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  kantorController.getKantorById
);

// Update Kantor
router.put(
  "/kantor/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  kantorController.updateKantor
);

// Soft Delete Kantor
router.delete(
  "/kantor/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  kantorController.deleteKantor
);

export default router;