import sequelize from "../config/config.js";

const Desa = {
    // Get all Kabupaten
    getAllDesa: async () => {
        const [results] = await sequelize.query("SELECT * FROM desa_kelurahan");
        return results;
    },

    // Get Kecamatan By kode kabupaten
    getDesaByKodekecamatan: async (kode_kecamatan) => {
        const result = await sequelize.query(
            `SELECT * FROM desa_kelurahan WHERE kode_kecamatan = ?`,
            {
                replacements: [kode_kecamatan],
                type: sequelize.QueryTypes.SELECT,
            }
        );
        return result;
    },
}

export default Desa;
