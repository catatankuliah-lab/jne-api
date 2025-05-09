import sequelize from "../config/config.js";

const ItemDetailArmada = {
  getAll: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        ida.*, 
        km.id_driver, 
        km.id_armada, 
        km.tanggal_masuk
      FROM item_detail_armada ida
      LEFT JOIN kendaraan_masuk km ON ida.id_kendaraan_masuk = km.id_kendaraan_masuk
    `);
    return results;
  },

  // Ambil data berdasarkan ID item_detail_armada
  getById: async (id_item_detail_armada) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        ida.*, 
        km.id_driver, 
        km.id_armada, 
        km.tanggal_masuk
      FROM item_detail_armada ida
      LEFT JOIN kendaraan_masuk km ON ida.id_kendaraan_masuk = km.id_kendaraan_masuk
      WHERE ida.id_item_detail_armada = ?
      `,
      {
        replacements: [id_item_detail_armada],
      }
    );
    return results[0];
  },

  getByIdKendaraanMasuk: async (id_kendaraan_masuk) => {
    const [results] = await sequelize.query(
      `
    SELECT 
      ida.*, 
      km.id_driver, 
      km.id_armada, 
      km.tanggal_masuk
    FROM item_detail_armada ida
    LEFT JOIN kendaraan_masuk km ON ida.id_kendaraan_masuk = km.id_kendaraan_masuk
    WHERE ida.id_kendaraan_masuk = ?
    `,
      {
        replacements: [id_kendaraan_masuk],
      }
    );
    return results;
  },

  add: async (id_kendaraan_masuk) => {
    const result = await sequelize.query(
      `
    INSERT INTO item_detail_armada (
      id_kendaraan_masuk
    ) VALUES (
      ?
    )
  `,
      {
        replacements: [id_kendaraan_masuk],
      }
    );
    return result[0].insertId;
  },

  uploadItemDetailArmada: async (id_item_detail_armada, FileFoto) => {
    const [result] = await sequelize.query(
      `
      UPDATE item_detail_armada
      SET foto_mobil_tampak_depan = ?
      WHERE id_item_detail_armada = ?
    `,
      {
        replacements: [FileFoto, id_item_detail_armada],
      }
    );
    return result.affectedRows > 0;
  },
  
  // Update data berdasarkan ID
  update: async (id_item_detail_armada, data) => {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const updates = fields.map((field) => `${field} = ?`).join(", ");

    const [result] = await sequelize.query(
      `
      UPDATE item_detail_armada
      SET ${updates}
      WHERE id_item_detail_armada = ?
      `,
      {
        replacements: [...values, id_item_detail_armada],
      }
    );
    return result.affectedRows > 0;
  },

  // Hapus data
  delete: async (id_item_detail_armada) => {
    const [result] = await sequelize.query(
      `DELETE FROM item_detail_armada WHERE id_item_detail_armada = ?`,
      {
        replacements: [id_item_detail_armada],
      }
    );
    return result.affectedRows > 0;
  },
};

export default ItemDetailArmada;
