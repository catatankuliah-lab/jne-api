import express from "express";
import * as detailWOController from "../controller/detailWOController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/detail-wo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailWOController.createDetailWO
);

router.get(
  "/detail-wo/:id_wo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailWOController.getDetailWOByIdWO
);

router.put(
  "/detail-wo/:id_detail_wo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailWOController.updateDetailWO
);

router.delete(
  "/detail-wo/:id_detail_wo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  detailWOController.deleteDetailWO
);

export default router;