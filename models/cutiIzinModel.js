import sequelize from "../config/config.js";
import { QueryTypes } from "sequelize";

const CutiIzin = {
  // ✅ Tambah CutiIzin
  addCutiIzin: async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
      INSERT INTO cuti_izin (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Get All CutiIzin (hanya yang belum dihapus)
  getAllCutiIzin: async ({
    jenis = [],
    status = [],
    id_karyawan = [],
  } = {}) => {
    let query = `
      SELECT
        cuti_izin.*,
        karyawan.nama
      FROM cuti_izin AS cuti_izin
      JOIN karyawan ON cuti_izin.id_karyawan = karyawan.id_karyawan
      WHERE cuti_izin.is_deleted = 0
    `;

    const replacements = [];

    if (Array.isArray(jenis) && jenis.length > 0) {
      const placeholders = jenis.map(() => "?").join(",");
      query += ` AND cuti_izin.jenis IN (${placeholders})`;
      replacements.push(...jenis);
    }

    if (Array.isArray(status) && status.length > 0) {
      const placeholders = status.map(() => "?").join(",");
      query += ` AND cuti_izin.status IN (${placeholders})`;
      replacements.push(...status);
    }

    if (Array.isArray(id_karyawan) && id_karyawan.length > 0) {
      const placeholders = id_karyawan.map(() => "?").join(",");
      query += ` AND cuti_izin.id_karyawan IN (${placeholders})`;
      replacements.push(...id_karyawan);
    }

    query += ` ORDER BY cuti_izin.created_at DESC`;

    const result = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    return result;
  },

  // ✅ Get Detail CutiIzin by ID
  getCutiIzinById: async (id) => {
    const query = `
      SELECT * FROM cuti_izin
      WHERE id_cuti_izin = ? AND is_deleted = 0
      LIMIT 1
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });

    return result[0];
  },

  // ✅ Update CutiIzin
  updateCutiIzin: async (id, data, options = {}) => {
    // jangan update kalau gak ada yang berubah
    const keys = Object.keys(data).filter((k) => data[k] !== undefined);
    if (keys.length === 0) {
      return { affectedRows: 0 };
    }

    const values = [];
    const setParts = keys.map((key) => {
      values.push(data[key]);
      return `${key} = ?`;
    });

    // tambahkan updated_at otomatis jika kamu mau, atau biarkan DB handle via trigger
    setParts.push(`updated_at = CURRENT_TIMESTAMP`);

    const query = `
      UPDATE cuti_izin
      SET ${setParts.join(", ")}
      WHERE id_cuti_izin = ? AND is_deleted = 0
    `;

    values.push(id); // untuk WHERE

    const [result] = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.UPDATE,
      ...options,
    });

    return result; // OkPacket (mengandung affectedRows)
  },

  // ✅ Soft Delete CutiIzin
  deleteCutiIzin: async (id) => {
    const query = `
      UPDATE cuti_izin
      SET is_deleted = 1
      WHERE id_cuti_izin = ?
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.UPDATE,
    });

    return result[0];
  },
};

export default CutiIzin;
