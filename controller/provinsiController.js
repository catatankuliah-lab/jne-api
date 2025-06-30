import Provinsi from "../models/provinsiModel.js"; // Ensure the model is created


// Get all Provinsi
export const getAllProvinsi = async (req, res) => {
    const { page = 1, limit = 10, kode_provinsi, nama_provinsi} = req.query;

    try {
        const { data, total } = await Provinsi.getAllProvinsi(
            parseInt(page),
            parseInt(limit),
            { kode_provinsi, nama_provinsi }
        );

        res.json({
            data,
            currentPage: parseInt(page),
            limit: parseInt(limit),
            totalData: total,
            totalPages: Math.ceil(total / parseInt(limit)),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Provinsi by ID
// export const getProvinsiById = async (req, res) => {
//     const { id_po } = req.params;

//     try {
//         const po = await PO.getPOById(id_po);
//         if (po) {
//             res.status(200).json({
//                 status: "success",
//                 data: po,
//                 message: "PO fetched successfully."
//             });
//         } else {
//             res.status(404).json({
//                 status: "error",
//                 message: "PO not found."
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching PO by ID:", error);
//         res.status(500).json({
//             status: "error",
//             message: "Internal Server Error"
//         });
//     }
// };
