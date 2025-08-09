import Agama from "../models/agamaModel.js";

export const getAgama = async (req, res) => {
  try {
    const roles = await Agama.getAgama();
    res.status(200).json({
      status: "success",
      data: roles,
      message: "Agama retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching agama:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
