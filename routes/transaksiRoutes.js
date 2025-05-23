import express from "express";
import * as transaksiController from "../controller/transaksiController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes for Transaksi with authentication and authorization
router.get(
  "/transaksi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10]),
  transaksiController.getAllTransaksi
);

router.get(
  "/transaksi/:id_kas_jalan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10, 13]),
  transaksiController.getTransaksiByIdKasJalan
);

router.post(
  "/transaksi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10]),
  transaksiController.addTransaksi
);

router.put(
  "/transaksi/upload/:id_transaksi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10, 13]),
  transaksiController.uploadTransaksi
);

router.put(
  "/transaksi/:id_transaksi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10]),
  transaksiController.updateTransaksi
);

router.delete(
  "/transaksi/:id_transaksi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10]),
  transaksiController.deleteTransaksi
);

// Routes for development (without authentication and authorization)
router.get("/dev/transaksi", transaksiController.getAllTransaksi);
router.get("/dev/transaksi/:id_transaksi", transaksiController.getTransaksiByIdKasJalan);
router.post("/dev/transaksi", transaksiController.addTransaksi);
router.put("/dev/transaksi/:id_transaksi", transaksiController.updateTransaksi);
router.delete("/dev/transaksi/:id_transaksi", transaksiController.deleteTransaksi);

export default router;
