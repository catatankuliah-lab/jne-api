import express from "express";
import * as statusKaryawanController from "../controller/statusKaryawanController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
// Get semua StatusKaryawan
router.get(
  "/status-karyawan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  statusKaryawanController.getAllStatusKaryawan
);

export default router;