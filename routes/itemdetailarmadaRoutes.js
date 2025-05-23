import express from "express";
import * as itemDetailArmadaController from "../controller/itemdetailarmadaController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes with authentication and role 15 only
router.get(
  "/itemdetailarmada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([15, 16]),
  itemDetailArmadaController.getAllItemDetailArmada
);

router.get(
  "/itemdetailarmada/kendaraanmasuk/:id_kendaraan_masuk",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([15, 16]),
  itemDetailArmadaController.getItemDetailArmadaByIdKendaraanMasuk
);

router.put(
  "/itemdetailarmada/upload/:id_item_detail_armada/:namafile",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([15, 16]),
  itemDetailArmadaController.uploadItemDetailArmada
);

router.get(
  "/itemdetailarmada/:id_item_detail_armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([15, 16]),
  itemDetailArmadaController.getItemDetailArmadaById
);

router.post(
  "/itemdetailarmada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([15, 16]),
  itemDetailArmadaController.addItemDetailArmada
);



router.put(
  "/itemdetailarmada/:id_item_detail_armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([15, 16]),
  itemDetailArmadaController.updateItemDetailArmada
);

router.delete(
  "/itemdetailarmada/:id_item_detail_armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([15, 16]),
  itemDetailArmadaController.deleteItemDetailArmada
);

// Development routes (no auth)
router.get("/dev/itemdetailarmada", itemDetailArmadaController.getAllItemDetailArmada);
router.get("/dev/itemdetailarmada/:id_item_detail_armada", itemDetailArmadaController.getItemDetailArmadaById);
router.post("/dev/itemdetailarmada", itemDetailArmadaController.addItemDetailArmada);
router.put("/dev/itemdetailarmada/:id_item_detail_armada", itemDetailArmadaController.updateItemDetailArmada);
router.delete("/dev/itemdetailarmada/:id_item_detail_armada", itemDetailArmadaController.deleteItemDetailArmada);

export default router;
