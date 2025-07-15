import express from "express";
import * as userController from "../controller/userController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  userController.createUser
);

router.get(
  "/user/pic",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  userController.getAllPIC
);

router.get(
  "/user/pic/kantor/:id_kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  userController.getAllPICKantor
);

router.get(
  "/user/checker",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  userController.getAllChecker
);

router.get(
  "/user/checker/gudang/:id_gudang",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  userController.getAllCheckerGudang
);

router.post("/dev/user", userController.createUser);

export default router;
