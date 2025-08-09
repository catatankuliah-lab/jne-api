import sequelize from "../config/config.js";

const JenisKelamin = {
  // Mendapatkan semua role
  getJenisKelamin: async () => {
    const [results] = await sequelize.query("SELECT * FROM jenis_kelamin");
    return results;
  },
};

export default JenisKelamin;
