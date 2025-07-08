import { isColString } from "sequelize/lib/utils";
import Lo from "../models/loModel.js";

export const createLo = async (req, res) => {
  const { id_wo, nomor_lo, tanggal_lo, driver, nopol, status_lo, nomor_do, nomor_sjt_bulog, telpon_driver, id_checker } = req.body;

  try {
    const loData = { id_wo, nomor_lo, tanggal_lo, driver, nopol, status_lo, nomor_do, nomor_sjt_bulog, telpon_driver, id_checker};
    const id_lo = await Lo.addLo(loData);

    res.status(201).json({
      status: "success",
      data: { id_lo, ...loData },
      message: "LO created successfully.",
    });
  } catch (error) {
    console.error("Error creating LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getAllLo = async (req, res) => {
  try {
    const data = await Lo.getAllLo();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.error("Error fetching LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getLoById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Lo.getLoById(id);

    if (!data) {
      return res.status(404).json({ status: "error", message: "LO not found" });
    }

    res.status(200).json({ status: "success", data });
  } catch (error) {
    console.error("Error fetching LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const getLoByIdKantor = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Lo.getLoByIdKantor(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "LO not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getLoByIdGudang = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Lo.getLoByIdGudang(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "LO not found",
      });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const updateLo = async (req, res) => {
  const { id } = req.params;
  const { id_wo, nomor_lo, tanggal_lo, driver, nopol, status_lo, nomor_do, nomor_sjt_bulog, id_checker } = req.body;

  try {
    const loData = { id_wo, nomor_lo, tanggal_lo, driver, nopol, status_lo, nomor_do, nomor_sjt_bulog, id_checker };
    await Lo.updateLo(id, loData);

    res.status(200).json({ status: "success", message: "LO updated successfully." });
  } catch (error) {
    console.error("Error updating LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export const deleteLo = async (req, res) => {
  const { id } = req.params;

  try {
    await Lo.deleteLo(id);
    res.status(200).json({ status: "success", message: "LO deleted successfully." });
  } catch (error) {
    console.error("Error deleting LO:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
