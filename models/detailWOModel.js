import sequelize from "../config/config.js";

const DetailWO = {
  addDetailWO: async (data) => {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const placeholders = fields.map(() => '?').join(', ');
    const fieldList = fields.join(', ');

    const query = `
      INSERT INTO detail_wo (${fieldList})
      VALUES (${placeholders})
    `;

    await sequelize.query(query, { replacements: values });

    const [[result]] = await sequelize.query("SELECT LAST_INSERT_ID() AS id_detail_wo");

    return result.id_detail_wo;
  },

  getDetailWOByIdWO: async (id_wo) => {
    const query = `SELECT * FROM detail_wo WHERE id_wo = ?`;

    const result = await sequelize.query(query, {
      replacements: [id_wo],
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  deleteDetailWO: async (id_detail_wo) => {
    const query = `DELETE FROM detail_wo WHERE id_detail_wo = ?`;

    await sequelize.query(query, {
      replacements: [id_detail_wo],
    });
  },
};

export default DetailWO;