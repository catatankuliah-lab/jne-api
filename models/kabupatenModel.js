import sequelize from "../config/config.js";

const Kabupaten = {
    // Get all Kabupaten
    getAllKabupaten: async () => {
    const [results] = await sequelize.query("SELECT * FROM kabupaten_kota");
    return results;
  },

  // Get all Kabupaten By Kode Provinsi

  getByKodeProvinsi: async (kode_provinsi) => {
    const result = await sequelize.query(
      `SELECT * FROM kabupaten_kota WHERE kode_provinsi = ?`,
      {
        replacements: [kode_provinsi],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },
}

export default Kabupaten;
