import express from "express";
import * as statusPernikahanController from "../controller/statusPernikahanController.js";

const router = express.Router();

router.get("/status-pernikahan", statusPernikahanController.getStatusPernikahan);

export default router;
