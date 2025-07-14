import express from "express";
import * as detailLOController from "../controller/detailLOController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/detail-lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailLOController.createOrUpdateDetailLO
);

router.get(
  "/detail-lo/lo/all",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailLOController.getAllDetailLO
);

router.get(
  "/detail-lo/lo/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailLOController.getAllDetailLOByIdLO
);

router.get(
  "/detail-lo/lo/kantor/:id_kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailLOController.getAllDetailLOByIdKantor
);

router.delete(
  "/detail-lo/:id_detail_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailLOController.deleteDetailLO
);

router.put(
  "/detail-lo/:id_detail_lo/foto",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailLOController.updateFotoDetailLO
);

router.get(
  "/detail-lo/lo/gudang/:id_gudang",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailLOController.getAllDetailLOByIdGudang
);

export default router;