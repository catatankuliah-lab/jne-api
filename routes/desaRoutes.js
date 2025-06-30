import express from "express";
import * as DesaController from "../controller/desaController.js"; // Ensure the controller file is created
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Ensure the middleware is available

const router = express.Router();

router.get(
    "/desa",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3]),
    DesaController.getAllDesa
);

router.get(
    "/desa/kecamatan/:id",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3]),
    DesaController.getDesaByKodekecamatan
);


export default router;
