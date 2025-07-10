import sequelize from "../config/config.js";

const Wo = {
  // Tambah data WO
  addWo: async (woData) => {
    const fields = Object.keys(woData);
    const values = Object.values(woData);

    const placeholders = fields.map(() => '?').join(', ');
    const fieldList = fields.join(', ');

    const query = `
      INSERT INTO wo (${fieldList})
      VALUES (${placeholders})
    `;

    await sequelize.query(query, {
      replacements: values,
    });

    const [[idResult]] = await sequelize.query("SELECT LAST_INSERT_ID() AS id_wo");

    return idResult.id_wo;
  },

  // Ambil semua data WO
  getAllWo: async () => {
    const result = await sequelize.query(`
      SELECT wo.*, gudang.nama_gudang, kantor.nama_kantor, user.nama_lengkap
      FROM wo
      JOIN gudang ON wo.id_gudang = gudang.id_gudang
      JOIN kantor ON wo.id_kantor = kantor.id_kantor
      JOIN user ON wo.id_pic = user.id_user`, {
      type: sequelize.QueryTypes.SELECT,
    });
    return result;
  },

  // Ambil detail WO berdasarkan ID
  getWoById: async (id_wo) => {
    const result = await sequelize.query(
      `SELECT wo.*, gudang.nama_gudang, kantor.nama_kantor, user.nama_lengkap
      FROM wo
      JOIN gudang ON wo.id_gudang = gudang.id_gudang
      JOIN kantor ON wo.id_kantor = kantor.id_kantor
      JOIN user ON wo.id_pic = user.id_user
      WHERE wo.id_wo = ?`,
      {
        replacements: [id_wo],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result[0];
  },

  // Ambil detail WO berdasarkan ID Kantor
  getWoByIdKantor: async (id_kantor) => {
    const result = await sequelize.query(
      `
      SELECT 
        wo.*, 
        gudang.nama_gudang, 
        kantor.nama_kantor, 
        user.nama_lengkap, 
        user.telpon_user,
        SUM(detail_wo.jumlah_pbp) AS total_jumlah_pbp,
        SUM(detail_wo.jumlah_quantum) AS jumlah_quantum
      FROM wo
      JOIN gudang ON wo.id_gudang = gudang.id_gudang
      JOIN kantor ON wo.id_kantor = kantor.id_kantor
      JOIN user ON wo.id_pic = user.id_user
      LEFT JOIN detail_wo ON detail_wo.id_wo = wo.id_wo
      WHERE wo.id_kantor = ?
      GROUP BY wo.id_wo`,
      {
        replacements: [id_kantor],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },

  // Ambil detail WO berdasarkan ID Gudang
  getWoByIdGudang: async (id_gudang, id_alokasi) => {
    const result = await sequelize.query(
      `
      SELECT 
        wo.*, 
        gudang.nama_gudang, 
        kantor.nama_kantor, 
        user.nama_lengkap, 
        user.telpon_user,
        SUM(detail_wo.jumlah_pbp) AS total_jumlah_pbp,
        SUM(detail_wo.jumlah_quantum) AS jumlah_quantum
      FROM wo
      JOIN gudang ON wo.id_gudang = gudang.id_gudang
      JOIN kantor ON wo.id_kantor = kantor.id_kantor
      JOIN user ON wo.id_pic = user.id_user
      LEFT JOIN detail_wo ON detail_wo.id_wo = wo.id_wo
      WHERE wo.id_gudang = ?
      AND wo.id_alokasi = ?
      GROUP BY wo.id_wo`,
      {
        replacements: [id_gudang, id_alokasi],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
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