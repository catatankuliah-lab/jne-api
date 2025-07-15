import sequelize from "../config/config.js";
import { createAbsensi } from "../controller/absensiController.js";

const AbsensiUser = {
  // Update data detail LO berdasarkan id_detail_lo
  // updateDetailLO: async (id_detail_lo, data) => {
  //     const fields = Object.keys(data);
  //     const values = Object.values(data);

  //     const setClause = fields.map(field => `${field} = ?`).join(', ');
  //     const query = `
  //     UPDATE detail_lo
  //     SET ${setClause}
  //     WHERE id_detail_lo = ?
  //     `;

  //     await sequelize.query(query, {
  //     replacements: [...values, id_detail_lo],
  //     });
  // },

  // Insert data baru ke absensi
  createAbsensi: async (data) => {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const placeholders = fields.map(() => "?").join(", ");
    const fieldList = fields.join(", ");

    const query = `
        INSERT INTO absensi (${fieldList})
        VALUES (${placeholders})
        `;

    const [result] = await sequelize.query(query, { replacements: values });
    return result;
  },

  // Get Kecamatan By kode kabupaten
  getAbsensiHariIni: async (id_user, tanggal) => {
    const [result] = await sequelize.query(
      `SELECT 
        absensi.*, 
        user.nama_lengkap, 
        kantor.nama_kantor, 
        CASE 
            WHEN user.id_gudang = 0 THEN 'PIMPINAN CABANG'
            ELSE gudang.nama_gudang 
        END AS nama_gudang
        FROM absensi
        JOIN user ON user.id_user = absensi.id_user
        JOIN kantor ON kantor.id_kantor = user.id_kantor
        LEFT JOIN gudang ON gudang.id_gudang = user.id_gudang
        WHERE absensi.id_user = ? 
        AND absensi.tanggal = ?
        ORDER BY absensi.id_absensi DESC;`,
      {
        replacements: [id_user, tanggal],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },

  updateAbsensi: async (id_absensi, updateData) => {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);

    const setClause = fields.map((field) => `${field} = ?`).join(", ");

    const query = `
        UPDATE absensi
        SET ${setClause}
        WHERE id_absensi = ?
    `;
    
    await sequelize.query(query, {
      replacements: [...values, id_absensi],
    });
  },
};

export default AbsensiUser;
