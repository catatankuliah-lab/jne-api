import express from "express";
import * as jenisKelaminController from "../controller/jenisKelaminController.js";

const router = express.Router();

router.get("/jenis-kelamin", jenisKelaminController.getJenisKelamin);

export default router;
