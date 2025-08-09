import sequelize from "../config/config.js";

const Pendidikan = {
  // ✅ Get All Pendidikan (hanya yang belum dihapus)
  getAllPendidikan: async () => {
    const query = `
      SELECT * FROM pendidikan
    `;

    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  }
};

export default Pendidikan;