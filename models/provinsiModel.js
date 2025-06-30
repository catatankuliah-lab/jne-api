import sequelize from "../config/config.js";

const Provinsi = {
    // Get all provinsi
    getAllProvinsi: async () => {
    const [results] = await sequelize.query("SELECT * FROM provinsi");
    return results;
  },
}

export default Provinsi;
