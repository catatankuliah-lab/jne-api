import express from "express";
import * as loController from "../controller/loController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.createLo
);

router.get(
  "/lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.getAllLo
);

router.get(
  "/lo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.getLoById
);

router.get(
  "/lo/kantor/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.getLoByIdKantor
);

router.get(
  "/lo/gudang/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.getLoByIdGudang
);

router.put(
  "/lo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.updateLo
);

router.delete(
  "/lo/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.deleteLo
);

router.put(
  "/lo/:id_lo/fotomuat",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.uploadMuatLO
);

router.put(
  "/lo/:id_lo/scandokumen",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.uploadScanDokumen
);

router.put(
  "/lo/:id_lo/scandokumenso",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.uploadScanDokumenSO
);

export default router;