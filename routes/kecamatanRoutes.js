import express from "express";
import * as KecamatanController from "../controller/kecamatanController.js"; // Ensure the controller file is created
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Ensure the middleware is available

const router = express.Router();

router.get(
    "/kecamatan",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3]),
    KecamatanController.getAllKecamatan
);

router.get(
    "/kecamatan/kabupaten/:id",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3]),
    KecamatanController.getByKodeKabupaten
);


export default router;
