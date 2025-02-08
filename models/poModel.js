import sequelize from "../config/config.js";

const PO = {
  // Mendapatkan semua PO
  getAllPO: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        id_po,
        tanggal_po,
        jam_pemesanan_po,
        jam_muat,
        id_customer,
        id_armada,
        id_driver,
        status_po
      FROM po
    `);
    return results;
  },

  // Mendapatkan Jumlah PO berdasarkan Bulan
  getJumlahPOBulanan: async (bulan) => {
    try {
      const tahunSekarang = new Date().getFullYear(); // Ambil tahun sekarang
      const bulanFormatted = bulan.toString().padStart(2, "0"); // Format jadi '01', '02', dst.

      const [results] = await sequelize.query(
        `
        SELECT COUNT(*) as jumlahPO
        FROM po
        WHERE tanggal_po LIKE ?
      `,
        { replacements: [`${tahunSekarang}-${bulanFormatted}%`] }
      );

      return results[0].jumlahPO || 0;
    } catch (error) {
      console.error("Error in getJumlahPOBulanan:", error);
      throw new Error("Gagal mengambil jumlah PO bulanan");
    }
  },

  // Mendapatkan PO berdasarkan ID
  getPOById: async (id_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_po,
        tanggal_po,
        jam_pemesanan_po,
        jam_muat,
        id_customer,
        id_armada,
        id_driver,
        status_po
      FROM po
      WHERE id_po = ?
    `,
      { replacements: [id_po] }
    );
    return results[0];
  },

  // Mendapatkan PO berdasarkan ID Customer
  getPOByCustomerId: async (id_customer) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_po,
        tanggal_po,
        jam_pemesanan_po,
        jam_muat,
        id_customer,
        id_armada,
        id_driver,
        status_po
      FROM po
      WHERE id_customer = ?
    `,
      { replacements: [id_customer] }
    );
    return results;
  },

  // Mendapatkan PO berdasarkan ID Armada
  getPOByArmadaId: async (id_armada) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_po,
        tanggal_po,
        jam_pemesanan_po,
        jam_muat,
        id_customer,
        id_armada,
        id_driver,
        status_po
      FROM po
      WHERE id_armada = ?
    `,
      { replacements: [id_armada] }
    );
    return results;
  },

  // Mendapatkan PO berdasarkan ID Driver
  getPOByDriverId: async (id_driver) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_po,
        tanggal_po,
        jam_pemesanan_po,
        jam_muat,
        id_customer,
        id_armada,
        id_driver,
        status_po
      FROM po
      WHERE id_driver = ?
    `,
      { replacements: [id_driver] }
    );
    return results;
  },

  // Menambahkan PO baru
  addPO: async (poData) => {
    const { nomor_po, tanggal_po, jam_pemesanan_po, jam_muat, id_customer, id_armada, id_driver, destination, status_po } = poData;
    const [result] = await sequelize.query(
      `
      INSERT INTO po (nomor_po,tanggal_po,jam_pemesanan_po,jam_muat,id_customer,id_armada,id_driver,destination,status_po)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [nomor_po, tanggal_po, jam_pemesanan_po, jam_muat, id_customer, id_armada, id_driver, destination, status_po],
      }
    );
    return { id_po: result.insertId, ...poData };
  },

  // Memperbarui PO
  updatePO: async (id_po, poData) => {
    const { tanggal_po, jam_pemesanan_po, jam_muat, id_customer, id_armada, id_driver, status_po } = poData;
    const [result] = await sequelize.query(
      `
      UPDATE po
      SET tanggal_po = ?, jam_pemesanan_po = ?, jam_muat = ?, id_customer = ?, id_armada = ?, id_driver = ?, status_po = ?
      WHERE id_po = ?
    `,
      {
        replacements: [tanggal_po, jam_pemesanan_po, jam_muat, id_customer, id_armada, id_driver, status_po, id_po],
      }
    );
    return result.affectedRows > 0;
  },

  // Menghapus PO
  deletePO: async (id_po) => {
    const [result] = await sequelize.query(
      `DELETE FROM po WHERE id_po = ?`,
      { replacements: [id_po] }
    );
    return result.affectedRows > 0;
  },
};

export default PO;
