import express from "express";
import * as AlokasiController from "../controller/alokasiController.js"; // Ensure the controller file is created
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Ensure the middleware is available

const router = express.Router();

router.get(
    "/alokasi",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3, 4]),
    AlokasiController.getAllAlokasi
);

export default router;
