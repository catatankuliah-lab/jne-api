import JenisKelamin from "../models/jenisKelaminModel.js";

export const getJenisKelamin = async (req, res) => {
  try {
    const roles = await JenisKelamin.getJenisKelamin();
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
