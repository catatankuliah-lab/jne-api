import sequelize from "../config/config.js";

const Wo = {
  // Tambah data WO
  addWo: async (woData) => {
    const keys = Object.keys(woData);
    const values = Object.values(woData);

    const fields = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');

    const query = `
      INSERT INTO wo (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // Ambil semua data WO
  getAllWo: async () => {
    const result = await sequelize.query(`SELECT * FROM wo`, {
      type: sequelize.QueryTypes.SELECT,
    });
    return result;
  },

  // Ambil detail WO berdasarkan ID
  getWoById: async (id_wo) => {
    const result = await sequelize.query(
      `SELECT * FROM wo WHERE id_wo = ?`,
      {
        replacements: [id_wo],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result[0];
  },

  // Update WO
  updateWo: async (id_wo, woData) => {
    const keys = Object.keys(woData);
    const values = Object.values(woData);

    const updates = keys.map((key) => `${key} = ?`).join(', ');

    const query = `
      UPDATE wo SET ${updates}
      WHERE id_wo = ?
    `;

    const result = await sequelize.query(query, {
      replacements: [...values, id_wo],
    });

    return result[0];
  },

  // Hapus WO
  deleteWo: async (id_wo) => {
    const result = await sequelize.query(
      `DELETE FROM wo WHERE id_wo = ?`,
      {
        replacements: [id_wo],
      }
    );
    return result[0];
  },
};

export default Wo;