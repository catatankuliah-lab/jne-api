import express from "express";
import * as shiftController from "../controller/shiftController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tambah Shift
router.post(
  "/shift",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  shiftController.addShift
);

// Get semua Shift
router.get(
  "/shift",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  shiftController.getAllShift
);

// Get detail Shift by ID
router.get(
  "/shift/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  shiftController.getShiftById
);

// Update Shift
router.put(
  "/shift/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  shiftController.updateShift
);

// Soft Delete Shift
router.delete(
  "/shift/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  shiftController.deleteShift
);

export default router;