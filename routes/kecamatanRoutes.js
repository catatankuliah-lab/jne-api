import express from "express";
import * as KecamatanController from "../controller/kecamatanController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/kecamatan",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3, 4]),
    KecamatanController.getAllKecamatan
);

router.get(
    "/kecamatan/kabupaten/:id",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3, 4]),
    KecamatanController.getByKodeKabupaten
);


export default router;
