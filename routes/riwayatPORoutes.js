import express from "express";
import multer from "multer";
import * as riwayatPOController from "../controller/riwayatPOController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer();
router.get(
  "/riwayatpo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  riwayatPOController.getRiwayatPO
);

router.post(
  "/riwayatpo",
  upload.none(),
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10]),
  riwayatPOController.addRiwayatPO
);

router.get(
  "/riwayatpo/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  riwayatPOController.getRiwayatPOByIdPO
);

router.get(
  "/riwayatpo/:id_riwayat_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  riwayatPOController.getRiwayatPOById
);

router.put(
  "/riwayatpo/status",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  riwayatPOController.updateStatusRiwayatPO
);

router.put(
  "/RiwayatPO/upload/:id_riwayat_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10]),
  riwayatPOController.uploadRiwayatPO
);

export default router;
