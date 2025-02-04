import Driver from "../models/driverModel.js";
import multer from "multer";
const upload = multer();

// Get all drivers

export const getAllDrivers = async (req, res) => {
  const { page = 1, limit = 10, } = req.query;

  try {
    const { data, total } = await Driver.getAllDrivers(
      parseInt(page),
      parseInt(limit),
    );

    res.json({
      data,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      totalData: total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get driver by ID
export const getDriverById = async (req, res) => {
  const { id_driver } = req.params;

  try {
    const driver = await Driver.getDriverById(id_driver);
    if (driver) {
      res.status(200).json({
        status: "success",
        data: driver,
        message: "Driver fetched successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Driver not found."
      });
    }
  } catch (error) {
    console.error("Error fetching driver by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Add a new driver
export const addDriver = async (req, res) => {
  const driverData = req.body;

  try {
    const newDriver = await Driver.addDriver(driverData);
    res.status(201).json({
      status: "success",
      data: newDriver,
      message: "Driver created successfully."
    });
  } catch (error) {
    console.error("Error creating driver:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Update driver
export const updateDriver = async (req, res) => {
  const { id_driver } = req.params;
  const driverData = req.body;

  try {
    const updatedDriver = await Driver.updateDriver(id_driver, driverData);
    if (updatedDriver) {
      res.status(200).json({
        status: "success",
        data: updatedDriver,
        message: "Driver updated successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Driver not found."
      });
    }
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Delete driver
export const deleteDriver = async (req, res) => {
  const { id_driver } = req.params;

  try {
    const deleted = await Driver.deleteDriver(id_driver);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Driver deleted successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Driver not found."
      });
    }
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};