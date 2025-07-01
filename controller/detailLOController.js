import DetailLO from "../models/detailLOModel.js";

export const createDetailLO = async (req, res) => {
  try {
    const id_detail_lo = await DetailLO.addDetailLO(req.body);

    res.status(201).json({
      status: "success",
      message: "Detail LO created successfully",
      data: { id_detail_lo, ...req.body },
    });
  } catch (error) {
    console.error("Error creating detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllDetailLOByIdLO = async (req, res) => {
  try {
    const { id_lo } = req.params;
    const data = await DetailLO.getAllDetailLOByIdLO(id_lo);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllDetailLO = async (req, res) => {
  try {
    const data = await DetailLO.getAllDetailLO();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllDetailLOByIdKantor = async (req, res) => {
  try {
    const { id_kantor } = req.params;
    const data = await DetailLO.getAllDetailLOByIdKantor(id_kantor);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllDetailLOByIdGudang = async (req, res) => {
  try {
    const { id_gudang } = req.params;
    const data = await DetailLO.getAllDetailLOByIdGudang(id_gudang);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const deleteDetailLO = async (req, res) => {
  try {
    const { id_detail_lo } = req.params;
    await DetailLO.deleteDetailLO(id_detail_lo);

    res.status(200).json({
      status: "success",
      message: "Detail LO deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting detail LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};