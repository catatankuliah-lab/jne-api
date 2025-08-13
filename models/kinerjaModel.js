import sequelize from "../config/config.js";
import { QueryTypes } from "sequelize";

const Kinerja = {
  // ✅ Tambah Kinerja
  addKinerja: async (data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
      INSERT INTO rekap_kinerja (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  getAllKinerja: async ({ start_date, end_date }) => {
    let query = `
    SELECT 
      rekap_kinerja.*,
      departemen.id_departemen,
      departemen.nama_departemen,
      bagian.id_bagian,
      bagian.nama_bagian,
      karyawan.nama
    FROM rekap_kinerja
    JOIN karyawan ON karyawan.id_karyawan = rekap_kinerja.id_karyawan
    JOIN bagian ON bagian.id_bagian = karyawan.id_bagian
    JOIN departemen ON departemen.id_departemen = bagian.id_departemen
    WHERE rekap_kinerja.is_deleted = 0
  `;

    // Tambahkan filter tanggal kalau ada
    if (start_date && end_date) {
      query += ` AND rekap_kinerja.tanggal BETWEEN :start_date AND :end_date`;
    }

    query += ` ORDER BY rekap_kinerja.created_at DESC`;

    const result = await sequelize.query(query, {
      replacements: {start_date, end_date },
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  getAllKinerjaByKaryawan: async ({ id_karyawan, start_date, end_date }) => {
    let query = `
    SELECT 
      rekap_kinerja.*,
      departemen.id_departemen,
      departemen.nama_departemen,
      bagian.id_bagian,
      bagian.nama_bagian,
      karyawan.nama
    FROM rekap_kinerja
    JOIN karyawan ON karyawan.id_karyawan = rekap_kinerja.id_karyawan
    JOIN bagian ON bagian.id_bagian = karyawan.id_bagian
    JOIN departemen ON departemen.id_departemen = bagian.id_departemen
    WHERE rekap_kinerja.is_deleted = 0 AND rekap_kinerja.id_karyawan = :id_karyawan
  `;

    // Tambahkan filter tanggal kalau ada
    if (start_date && end_date) {
      query += ` AND rekap_kinerja.tanggal BETWEEN :start_date AND :end_date`;
    }

    query += ` ORDER BY rekap_kinerja.created_at DESC`;

    const result = await sequelize.query(query, {
      replacements: { id_karyawan, start_date, end_date },
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  // ✅ Get Detail Kinerja by ID
  getKinerjaById: async (id) => {
    const query = `
      SELECT 
        rekap_kinerja.*,
        departemen.id_departemen,
        departemen.nama_departemen,
        bagian.id_bagian,
        bagian.nama_bagian,
        karyawan.nama
      FROM rekap_kinerja
      JOIN karyawan ON karyawan.id_karyawan = rekap_kinerja.id_karyawan
      JOIN bagian ON bagian.id_bagian = karyawan.id_bagian
      JOIN departemen ON departemen.id_departemen = bagian.id_departemen
      WHERE rekap_kinerja.id_rekap = ? AND rekap_kinerja.is_deleted = 0
      LIMIT 1
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });

    return result[0];
  },

  // ✅ Update Kinerja
  updateKinerja: async (id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.map((key) => `${key} = ?`).join(", ");

    const query = `
      UPDATE rekap_kinerja
      SET ${fields}
      WHERE id_rekap = ? AND is_deleted = 0
    `;

    values.push(id);

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // ✅ Soft Delete Kinerja
  deleteKinerja: async (id, updatedBy) => {
    const query = `
      UPDATE rekap_kinerja
      SET is_deleted = 1, updated_by = ?
      WHERE id_rekap = ?
    `;

    const result = await sequelize.query(query, {
      replacements: [updatedBy, id],
    });

    return result[0];
  },
};

export default Kinerja;
