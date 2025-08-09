import sequelize from "../config/config.js";
import { QueryTypes } from "sequelize";

const Absensi = {
  // ✅ Tambah Absensi
  addAbsensiMasuk: async (data) => {
    console.log("INSERT DATA KE DATABASE:", data);
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
      INSERT INTO absensi (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  cekAbsensiHariIni: async (id_karyawan, tanggal) => {
    const query = `
      SELECT *
      FROM absensi
      WHERE id_karyawan = ?
      AND tanggal = ?
      LIMIT 1
    `;

    const result = await sequelize.query(query, {
      replacements: [id_karyawan, tanggal],
      type: QueryTypes.SELECT,
    });

    return result[0] || null;
  },

  updateAbsensiPulang: async (id_absensi, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    const query = `
    UPDATE absensi
    SET ${setClause}
    WHERE id_absensi = ?
  `;

    const result = await sequelize.query(query, {
      replacements: [...values, id_absensi],
      type: QueryTypes.UPDATE,
    });

    return result;
  },
};

export default Absensi;
