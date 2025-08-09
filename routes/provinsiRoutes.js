import express from "express";
import * as provinsiController from "../controller/provinsiController.js"; // Ensure the controller file is created
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Ensure the middleware is available

const router = express.Router();

router.get(
    "/provinsi",
    authMiddleware.authenticate,
    authMiddleware.authorizeRole([1, 2, 3, 4]),
    provinsiController.getAllProvinsi
);



export default router;
