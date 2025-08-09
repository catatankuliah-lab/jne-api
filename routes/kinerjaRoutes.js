import express from "express";
import * as konerjaController from "../controller/kinerjaController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tambah Kinerja
router.post(
  "/kinerja",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  konerjaController.addKinerja
);

router.get(
  "/kinerja/karyawan/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  konerjaController.getAllKinerjaByKaryawan
);


// Get detail Kinerja by ID
router.get(
  "/kinerja/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  konerjaController.getKinerjaById
);

// Update Kinerja
router.put(
  "/kinerja/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  konerjaController.updateKinerja
);

// Soft Delete Kinerja
router.delete(
  "/kinerja/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  konerjaController.deleteKinerja
);
export default router;