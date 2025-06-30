import express from "express";
import * as woController from "../controller/woController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/wo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  woController.createWo
);

router.get(
  "/wo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  woController.getAllWo
);

router.get(
  "/wo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  woController.getWoById
);

router.get(
  "/wo/kantor/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  woController.getWoByIdKantor
);

router.get(
  "/wo/gudang/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  woController.getWoByIdGudang
);

router.put(
  "/wo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  woController.updateWo
);

router.delete(
  "/wo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  woController.deleteWo
);

export default router;
