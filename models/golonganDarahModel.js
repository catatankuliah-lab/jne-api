import sequelize from "../config/config.js";

const GolonganDarah = {
  // Mendapatkan semua role
  getGolonganDarah: async () => {
    const [results] = await sequelize.query("SELECT * FROM golongan_darah");
    return results;
  },
};

export default GolonganDarah;
