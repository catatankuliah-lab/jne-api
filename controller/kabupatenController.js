import Kabupaten from "../models/kabupatenModel.js"; // Ensure the model is created

// Get all Provinsi
export const getAllKabupaten = async (req, res) => {
  try {
    const kabupaten = await Kabupaten.getAllKabupaten();
    res.status(200).json({
      status: "success",
      data: kabupaten,
      message: "Kabupaten retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching Kabupaten:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getByKodeProvinsi = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Kabupaten.getByKodeProvinsi(id);
    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Kabupaten not found",
      });
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching Kabupaten:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getByIdKantor = async (req, res) => {
  const { id_kantor } = req.params;

  try {
    const data = await Kabupaten.getByIdKantor(id_kantor);
    if (!data || data.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Kabupaten not found",
      });
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Error fetching Kabupaten:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getRealisasiPusat = async (req, res) => {
  const { nama_kantor, kode_kabupaten_kota, id_alokasi } = req.query;

  try {
    const data = await Kabupaten.getRealisasiPusat({
      nama_kantor,
      kode_kabupaten_kota,
      id_alokasi,
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getRealisasiByIdKantor:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getRealisasiByIdKantor = async (req, res) => {
  const { id_kantor } = req.params;
  const { kode_kabupaten_kota, id_alokasi } = req.query;

  try {
    const data = await Kabupaten.getRealisasiByIdKantor({
      id_kantor,
      kode_kabupaten_kota,
      id_alokasi,
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error getRealisasiByIdKantor:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
