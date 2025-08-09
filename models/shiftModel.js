import sequelize from "../config/config.js";

const Shift = {
  // ✅ Tambah Shift
  addShift: async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
      INSERT INTO shift (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Get All Shift (hanya yang belum dihapus)
  getAllShift: async () => {
    const query = `
      SELECT * FROM shift
      WHERE is_deleted = 0
      ORDER BY id_shift ASC
    `;

    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  // ✅ Get Detail Shift by ID
  getShiftById: async (id) => {
    const query = `
      SELECT * FROM shift
      WHERE id_shift = ? AND is_deleted = 0
      LIMIT 1
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });

    return result[0];
  },

  // ✅ Update Shift
  updateShift: async (id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.map((key) => `${key} = ?`).join(", ");

    const query = `
      UPDATE shift
      SET ${fields}
      WHERE id_shift = ? AND is_deleted = 0
    `;

    values.push(id);

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Soft Delete Shift
  deleteShift: async (id) => {
    const query = `
      UPDATE shift
      SET is_deleted = 1
      WHERE id_shift = ?
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.UPDATE
    });

    return result[0];
  },
};

export default Shift;