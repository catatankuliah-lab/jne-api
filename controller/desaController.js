import Desa from "../models/desaModel.js"; // Ensure the model is created


// Get all Desa
export const getAllDesa = async (req, res) => {
    try {
        const desa = await Desa.getAllDesa();
        res.status(200).json({
            status: "success",
            data: desa,
            message: "desa retrieved successfully.",
        });
    } catch (error) {
        console.error("Error fetching desa:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

// Get desa By kode kecamatan
export const getDesaByKodekecamatan = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Desa.getDesaByKodekecamatan(id);
        if (!data) {
            return res.status(404).json({
                status: "error",
                message: "Desa not found",
            });
        }
        res.status(200).json({
            status: "success",
            data,
        });
    } catch (error) {
        console.error("Error fetching Desa:", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

