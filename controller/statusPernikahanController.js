import StatusPernikahan from "../models/statusPernikahanModel.js";

export const getStatusPernikahan = async (req, res) => {
  try {
    const roles = await StatusPernikahan.getStatusPernikahan();
    res.status(200).json({
      status: "success",
      data: roles,
      message: "Roles retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
