import express from "express";
import * as pendidikanController from "../controller/pendidikanController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get semua Pendidikan
router.get(
  "/pendidikan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  pendidikanController.getAllPendidikan
);


export default router;