import sequelize from "../config/config.js";

const Provinsi = {
    getAllProvinsi: async () => {
    const [results] = await sequelize.query("SELECT * FROM provinsi ORDER BY nama_provinsi ASC");
    return results;
  },
}

export default Provinsi;
