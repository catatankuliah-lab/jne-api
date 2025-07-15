import express from "express";
import * as woController from "../controller/woController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/wo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  woController.createWo
);

router.get(
  "/wo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  woController.getAllWo
);

router.get(
  "/wo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  woController.getWoById
);

router.get(
  "/wo/kantor/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  woController.getWoByIdKantor
);

router.get(
  "/wo/gudang/:id/alokasi/:id_alokasi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  woController.getWoByIdGudang
);

router.put(
  "/wo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  woController.updateWo
);

router.delete(
  "/wo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  woController.deleteWo
);

export default router;
