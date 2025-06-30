import express from "express";
import * as loController from "../controller/loController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.createLo
);

router.get(
  "/lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.getAllLo
);

router.get(
  "/lo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.getLoById
);

router.get(
  "/lo/kantor/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.getLoByIdKantor
);

router.get(
  "/lo/gudang/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.getLoByIdGudang
);

router.put(
  "/lo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.updateLo
);

router.delete(
  "/lo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.deleteLo
);

export default router;