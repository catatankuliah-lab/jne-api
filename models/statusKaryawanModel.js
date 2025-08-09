import sequelize from "../config/config.js";

const StatusKaryawan = {
  // ✅ Get All Pendidikan (hanya yang belum dihapus)
  getAllStatusKaryawan: async () => {
    const query = `
      SELECT * FROM status_karyawan
    `;

    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },
};

export default StatusKaryawan;