import express from "express";
import * as golonganDarahRoutes from "../controller/golonganDarahController.js";

const router = express.Router();

router.get("/golongan-darah", golonganDarahRoutes.getGolonganDarah);

export default router;
