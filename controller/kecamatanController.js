import Kecamatan from "../models/kecamatanModel.js"; // Ensure the model is created


// Get all Kecamatan
export const getAllKecamatan = async (req, res) => {
    try {
        const kecamatan = await Kecamatan.getAllKecamatan();
        res.status(200).json({
            status: "success",
            data: kecamatan,
            message: "kecamatan retrieved successfully.",
        });
    } catch (error) {
        console.error("Error fetching kecamatan:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

// Get Kecamatan By kode kabupaten
export const getByKodeKabupaten = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Kecamatan.getByKodeKabupaten(id);
        if (!data) {
            return res.status(404).json({
                status: "error",
                message: "Kecamatan not found",
            });
        }
        res.status(200).json({
            status: "success",
            data,
        });
    } catch (error) {
        console.error("Error fetching Kecamatan:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

