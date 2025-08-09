import express from "express";
import * as DesaController from "../controller/desaController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/desa",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3, 4]),
    DesaController.getAllDesa
);

router.get(
    "/desa/kecamatan/:id",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3, 4]),
    DesaController.getDesaByKodekecamatan
);


export default router;
