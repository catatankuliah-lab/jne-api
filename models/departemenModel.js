import sequelize from "../config/config.js";

const Departemen = {
  // ✅ Tambah Departemen
  addDepartemen: async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
      INSERT INTO departemen (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Get All Departemen (hanya yang belum dihapus)
  getAllDepartemen: async () => {
    const query = `
      SELECT * FROM departemen
      WHERE is_deleted = 0
      ORDER BY created_at DESC
    `;

    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  // ✅ Get Detail Departemen by ID
  getDepartemenById: async (id) => {
    const query = `
      SELECT * FROM departemen
      WHERE id_departemen = ? AND is_deleted = 0
      LIMIT 1
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });

    return result[0];
  },

  // ✅ Update Departemen
  updateDepartemen: async (id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.map((key) => `${key} = ?`).join(", ");

    const query = `
      UPDATE departemen
      SET ${fields}
      WHERE id_departemen = ? AND is_deleted = 0
    `;

    values.push(id);

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Soft Delete Departemen
  deleteDepartemen: async (id, updatedBy) => {
    const query = `
      UPDATE departemen
      SET is_deleted = 1, updated_by = ?
      WHERE id_departemen = ?
    `;

    const result = await sequelize.query(query, {
      replacements: [updatedBy, id],
    });

    return result[0];
  },
};

export default Departemen;