import sequelize from "../config/config.js";

const DetailWO = {
  addDetailWO: async (data) => {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const placeholders = fields.map(() => '?').join(', ');
    const fieldList = fields.join(', ');

    const query = `
      INSERT INTO detail_wo (${fieldList})
      VALUES (${placeholders})
    `;

    await sequelize.query(query, { replacements: values });

    const [[result]] = await sequelize.query("SELECT LAST_INSERT_ID() AS id_detail_wo");

    return result.id_detail_wo;
  },

  getDetailWOByIdWO: async (id_wo) => {
    const query = `
    SELECT detail_wo.*, provinsi.nama_provinsi, kabupaten_kota.nama_kabupaten_kota, kecamatan.nama_kecamatan, desa_kelurahan.nama_desa_kelurahan
    FROM detail_wo
    JOIN provinsi ON provinsi.kode_provinsi = detail_wo.kode_provinsi
    JOIN kabupaten_kota ON kabupaten_kota.kode_kabupaten_kota = detail_wo.kode_kabupaten_kota
    JOIN kecamatan ON kecamatan.kode_kecamatan = detail_wo.kode_kecamatan
    JOIN desa_kelurahan ON desa_kelurahan.kode_desa_kelurahan = detail_wo.kode_desa_kelurahan
    WHERE detail_wo.id_wo = ?`;

    const result = await sequelize.query(query, {
      replacements: [id_wo],
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  deleteDetailWO: async (id_detail_wo) => {
    const query = `DELETE FROM detail_wo WHERE id_detail_wo = ?`;

    await sequelize.query(query, {
      replacements: [id_detail_wo],
    });
  },
};

export default DetailWO;