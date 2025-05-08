import sequelize from "../config/config.js";

const Transaksi = {
  // Mendapatkan semua transaksi
  getAllTransaksi: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        id_transaksi,
        id_kas_jalan,
        jenis_transaksi,
        tanggal_transaksi,
        nominal,
        bukti_transaksi
      FROM transaksi
    `);
    return results;
  },

  // Mendapatkan transaksi berdasarkan ID
  getTransaksiByIdKasJalan: async (id_kas_jalan) => {
    const [results] = await sequelize.query(
      "SELECT * FROM transaksi WHERE id_kas_jalan = ?",
      {
        replacements: [id_kas_jalan],
      }
    );
    
    return results; // ✅ hanya rows-nya saja
  },  

  // Menambahkan transaksi baru
  addTransaksi: async (id_kas_jalan, jenis_transaksi, tanggal_transaksi, nominal, buktiPath) => {
    const [result] = await sequelize.query(
      `
      INSERT INTO transaksi (id_kas_jalan, jenis_transaksi, tanggal_transaksi, nominal, bukti_transaksi)
      VALUES (?, ?, ?, ?, ?)
    `,
      {
        replacements: [id_kas_jalan, jenis_transaksi, tanggal_transaksi, nominal, buktiPath],
      }
    );
    return result;
  },

  // Memperbarui transaksi
  updateTransaksi: async (id_transaksi, transaksiData) => {
    const { id_kas_jalan, jenis_transaksi, tanggal_transaksi, nominal, bukti_transaksi } = transaksiData;
    const [result] = await sequelize.query(
      `
      UPDATE transaksi
      SET id_kas_jalan = ?, jenis_transaksi = ?, tanggal_transaksi = ?, nominal = ?, bukti_transaksi = ?
      WHERE id_transaksi = ?
    `,
      {
        replacements: [id_kas_jalan, jenis_transaksi, tanggal_transaksi, nominal, bukti_transaksi, id_transaksi],
      }
    );
    return result.affectedRows > 0;
  },

  // Menghapus transaksi
  deleteTransaksi: async (id_transaksi) => {
    const [result] = await sequelize.query(
      `DELETE FROM transaksi WHERE id_transaksi = ?`,
      { replacements: [id_transaksi] }
    );
    return result.affectedRows > 0;
  },

  // Upload bukti transaksi (update path file)
  uploadBuktiTransaksi: async (id_transaksi, buktiPath) => {
    const [result] = await sequelize.query(
      `
      UPDATE transaksi
      SET bukti_transaksi = ?
      WHERE id_transaksi = ?
    `,
      {
        replacements: [buktiPath, id_transaksi],
      }
    );
    return result.affectedRows > 0;
  }
};

export default Transaksi;
