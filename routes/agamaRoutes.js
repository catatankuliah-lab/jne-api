import express from "express";
import * as agamaController from "../controller/agamaKelaminController.js";

const router = express.Router();

router.get("/agama", agamaController.getAgama);

export default router;
