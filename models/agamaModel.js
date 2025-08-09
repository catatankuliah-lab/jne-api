import sequelize from "../config/config.js";

const Agama = {
  // Mendapatkan semua role
  getAgama: async () => {
    const [results] = await sequelize.query("SELECT * FROM agama");
    return results;
  },
};

export default Agama;
