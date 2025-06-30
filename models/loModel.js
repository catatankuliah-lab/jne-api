import sequelize from "../config/config.js";

const Lo = {
  addLo: async (loData) => {
    const fields = Object.keys(loData);
    const values = Object.values(loData);

    const placeholders = fields.map(() => '?').join(', ');
    const fieldList = fields.join(', ');

    const query = `INSERT INTO lo (${fieldList}) VALUES (${placeholders})`;

    await sequelize.query(query, { replacements: values });
    const [[idResult]] = await sequelize.query("SELECT LAST_INSERT_ID() AS id_lo");

    return idResult.id_lo;
  },

  getAllLo: async () => {
    const result = await sequelize.query(`SELECT * FROM lo`, {
      type: sequelize.QueryTypes.SELECT,
    });
    return result;
  },

  getLoById: async (id_lo) => {
    const result = await sequelize.query(`SELECT * FROM lo WHERE id_lo = ?`, {
      replacements: [id_lo],
      type: sequelize.QueryTypes.SELECT,
    });
    return result[0];
  },

  updateLo: async (id_lo, loData) => {
    const keys = Object.keys(loData);
    const values = Object.values(loData);

    const updates = keys.map((key) => `${key} = ?`).join(', ');
    const query = `UPDATE lo SET ${updates} WHERE id_lo = ?`;

    return await sequelize.query(query, { replacements: [...values, id_lo] });
  },

  deleteLo: async (id_lo) => {
    return await sequelize.query(`DELETE FROM lo WHERE id_lo = ?`, {
      replacements: [id_lo],
    });
  },
};

export default Lo;