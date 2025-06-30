import sequelize from "../config/config.js";

const Kecamatan = {
    // Get all Kabupaten
    getAllKecamatan: async () => {
    const [results] = await sequelize.query("SELECT * FROM kecamatan");
    return results;
    },

  // Get Kecamatan By kode kabupaten
  getByKodeKabupaten: async (kode_kabupaten_kota) => {
    const result = await sequelize.query(
      `SELECT * FROM kecamatan WHERE kode_kabupaten_kota = ?`,
      {
        replacements: [kode_kabupaten_kota],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },
}

export default Kecamatan;
