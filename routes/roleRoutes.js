import express from "express";
import * as roleController from "../controller/roleController.js";

const router = express.Router();

router.get("/role", roleController.getAllRoles);

export default router;
