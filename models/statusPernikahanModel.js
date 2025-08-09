import sequelize from "../config/config.js";

const StatusPernikahan = {
  // Mendapatkan semua role
  getStatusPernikahan: async () => {
    const [results] = await sequelize.query("SELECT * FROM status_pernikahan");
    return results;
  },
};

export default StatusPernikahan;
