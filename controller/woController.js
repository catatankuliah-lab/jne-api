import Wo from "../models/woModel.js";

export const createWo = async (req, res) => {
  const { nomor_wo, tanggal_muat, tanggal_distribusi, id_gudang, id_pic } = req.body;

  try {
    const woData = {
      nomor_wo,
      tanggal_muat,
      tanggal_distribusi,
      id_gudang,
      id_pic,
    };

    const result = await Wo.addWo(woData);

    res.status(201).json({
      status: "success",
      data: woData,
      message: "WO created successfully.",
    });
  } catch (error) {
    console.error("Error creating WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getAllWo = async (req, res) => {
  try {
    const data = await Wo.getAllWo();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getWoById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Wo.getWoById(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "WO not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const updateWo = async (req, res) => {
  const { id } = req.params;
  const { nomor_wo, tanggal_muat, tanggal_distribusi, id_gudang, id_pic } = req.body;

  try {
    const woData = {
      nomor_wo,
      tanggal_muat,
      tanggal_distribusi,
      id_gudang,
      id_pic,
    };

    await Wo.updateWo(id, woData);

    res.status(200).json({
      status: "success",
      message: "WO updated successfully.",
    });
  } catch (error) {
    console.error("Error updating WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const deleteWo = async (req, res) => {
  const { id } = req.params;

  try {
    await Wo.deleteWo(id);

    res.status(200).json({
      status: "success",
      message: "WO deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting WO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};