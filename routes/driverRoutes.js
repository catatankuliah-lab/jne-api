import express from "express";
import * as driverController from "../controller/driverController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes untuk driver dengan otentikasi dan otorisasi
router.get(
  "/driver",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 7, 9]),
  driverController.getAllDrivers
);

router.get(
  "/driver/availability",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 7, 9]),
  driverController.getDriverAvailability
);

router.get(
  "/driver/:id_driver",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 7, 9]),
  driverController.getDriverById
);

router.post(
  "/driver",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 7, 9]),
  driverController.addDriver
);

router.put(
  "/driver/:id_driver",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 7, 9]),
  driverController.updateDriver
);

router.delete(
  "/driver/:id_driver",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 7, 9]),
  driverController.deleteDriver
);


// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/driver", driverController.getAllDrivers);
router.get("/dev/driver/:id_driver", driverController.getDriverById);
router.post("/dev/driver", driverController.addDriver);
router.put("/dev/driver/:id_driver", driverController.updateDriver);
router.delete("/dev/driver/:id_driver", driverController.deleteDriver);
router.get("/driver/availability", driverController.getDriverAvailability);


export default router;