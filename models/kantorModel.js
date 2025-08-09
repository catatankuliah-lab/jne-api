import sequelize from "../config/config.js";

const Kantor = {
  // ✅ Tambah Kantor
  addKantor: async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
      INSERT INTO kantor (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Get All Kantor (hanya yang belum dihapus)
  getAllKantor: async () => {
    const query = `
      SELECT * FROM kantor
      WHERE is_deleted = 0
    `;

    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  // ✅ Get Detail Kantor by ID
  getKantorById: async (id) => {
    const query = `
      SELECT * FROM kantor
      WHERE id_kantor = ? AND is_deleted = 0
      LIMIT 1
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });

    return result[0];
  },

  // ✅ Update Kantor
  updateKantor: async (id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.map((key) => `${key} = ?`).join(", ");

    const query = `
      UPDATE kantor
      SET ${fields}
      WHERE id_kantor = ? AND is_deleted = 0
    `;

    values.push(id);

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Soft Delete Kantor
  deleteKantor: async (id) => {
    const query = `
      UPDATE kantor
      SET is_deleted = 1
      WHERE id_kantor = ?
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
    });

    return result[0];
  },
};

export default Kantor;