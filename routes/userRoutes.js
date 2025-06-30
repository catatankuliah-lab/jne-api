import express from "express";
import * as userController from "../controller/userController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  userController.createUser
);

router.get(
  "/user/pic",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  userController.getPIC
);

router.post("/dev/user", userController.createUser);

export default router;
