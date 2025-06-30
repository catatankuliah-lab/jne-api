import DetailWO from "../models/detailWOModel.js";

export const createDetailWO = async (req, res) => {
  try {
    const id_detail_wo = await DetailWO.addDetailWO(req.body);

    res.status(201).json({
      status: "success",
      message: "Detail WO created successfully",
      data: { id_detail_wo, ...req.body },
    });
  } catch (error) {
    console.error("Error creating detail WO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getDetailWOByIdWO = async (req, res) => {
  try {
    const { id_wo } = req.params;
    const data = await DetailWO.getDetailWOByIdWO(id_wo);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching detail WO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const deleteDetailWO = async (req, res) => {
  try {
    const { id_detail_wo } = req.params;
    await DetailWO.deleteDetailWO(id_detail_wo);

    res.status(200).json({
      status: "success",
      message: "Detail WO deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting detail WO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};