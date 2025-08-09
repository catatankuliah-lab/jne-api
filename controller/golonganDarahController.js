import GolonganDarah from "../models/golonganDarahModel.js";

export const getGolonganDarah = async (req, res) => {
  try {
    const roles = await GolonganDarah.getGolonganDarah();
    res.status(200).json({
      status: "success",
      data: roles,
      message: "Golongan Darah retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
