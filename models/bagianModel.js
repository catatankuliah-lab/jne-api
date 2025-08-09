import sequelize from "../config/config.js";
import { QueryTypes } from "sequelize";

const Bagian = {
  // ✅ Tambah Bagian
  addBagian: async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
      INSERT INTO bagian (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Get All Bagian (hanya yang belum dihapus)
  getAllBagian: async () => {
    const query = `
      SELECT 
        bagian.*,
        departemen.nama_departemen
      FROM bagian
      JOIN departemen ON departemen.id_departemen = bagian.id_departemen
      WHERE bagian.is_deleted = 0
      ORDER BY created_at DESC
    `;

    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  // ✅ Get Detail Bagian by ID
  getBagianById: async (id) => {
    const query = `
      SELECT 
        bagian.*,
        departemen.id_departemen,
        departemen.nama_departemen
      FROM bagian
      JOIN departemen ON departemen.id_departemen = bagian.id_departemen
      WHERE bagian.id_bagian = ? AND bagian.is_deleted = 0
      LIMIT 1
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });

    return result[0];
  },

  // ✅ Get Detail Bagian by Id Departemen
  getBagianByIdDepartemen: async (id) => {
    const query = `
      SELECT 
        bagian.*,
        departemen.nama_departemen
      FROM bagian
      JOIN departemen ON departemen.id_departemen = bagian.id_departemen
      WHERE bagian.id_departemen = ? AND bagian.is_deleted = 0
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  // ✅ Update Bagian
  updateBagian: async (id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.map((key) => `${key} = ?`).join(", ");

    const query = `
      UPDATE bagian
      SET ${fields}
      WHERE id_bagian = ? AND is_deleted = 0
    `;

    values.push(id);

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Soft Delete Bagian
  deleteBagian: async (id, updatedBy) => {
    const query = `
      UPDATE bagian
      SET is_deleted = 1, updated_by = ?
      WHERE id_bagian = ?
    `;

    const result = await sequelize.query(query, {
      replacements: [updatedBy, id],
    });

    return result[0];
  },

  getBagianByDepartemenMultiple: async (ids) => {
    let query = `
    SELECT 
      bagian.*,
      departemen.nama_departemen
    FROM bagian
    JOIN departemen ON departemen.id_departemen = bagian.id_departemen
    WHERE bagian.is_deleted = 0
  `;

    let replacements = [];

    if (Array.isArray(ids) && ids.length > 0) {
      const placeholders = ids.map(() => "?").join(", ");
      query += ` AND bagian.id_departemen IN (${placeholders})`;
      replacements = ids;
    }

    const result = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    return result;
  },
};

export default Bagian;
