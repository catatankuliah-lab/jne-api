import express from "express";
import * as kabupatenController from "../controller/kabupatenController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/kabupaten",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3, 4]),
    kabupatenController.getAllKabupaten
);

router.get(
    "/kabupaten/provinsi/:id",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3, 4]),
    kabupatenController.getByKodeProvinsi
);



export default router;
