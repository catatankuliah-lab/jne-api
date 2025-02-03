import sequelize from "../config/config.js";

const Driver = {
  // Mendapatkan semua driver
  getAllDrivers: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        id_driver,
        id_user,
        nik,
        telpon_driver,
        nama_kontak_darurat_driver,
        telpon_kontak_darurat_driver,
        masa_berlaku_sim,
        foto_ktp_driver,
        foto_sim_driver,
        status_driver
      FROM driver
    `);
    return results;
  },

  // Mendapatkan driver berdasarkan ID
  getDriverById: async (id_driver) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_driver,
        id_user,
        nik,
        telpon_driver,
        nama_kontak_darurat_driver,
        telpon_kontak_darurat_driver,
        masa_berlaku_sim,
        foto_ktp_driver,
        foto_sim_driver,
        status_driver
      FROM driver
      WHERE id_driver = ?
    `,
      { replacements: [id_driver] }
    );
    return results[0];
  },

  // Menambahkan driver baru
  addDriver: async (driverData) => {
    const {
      id_user,
      nik,
      telpon_driver,
      nama_kontak_darurat_driver,
      telpon_kontak_darurat_driver,
      masa_berlaku_sim,
      foto_ktp_driver,
      foto_sim_driver,
      status_driver,
    } = driverData;
    const [result] = await sequelize.query(
      `
      INSERT INTO driver (id_user, nik, telpon_driver, nama_kontak_darurat_driver, telpon_kontak_darurat_driver, masa_berlaku_sim, foto_ktp_driver, foto_sim_driver, status_driver)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_user,
          nik,
          telpon_driver,
          nama_kontak_darurat_driver,
          telpon_kontak_darurat_driver,
          masa_berlaku_sim,
          foto_ktp_driver,
          foto_sim_driver,
          status_driver,
        ],
      }
    );
    return { id_driver: result.insertId, ...driverData };
  },

  // Memperbarui data driver
  updateDriver: async (id_driver, driverData) => {
    const {
      id_user,
      nik,
      telpon_driver,
      nama_kontak_darurat_driver,
      telpon_kontak_darurat_driver,
      masa_berlaku_sim,
      foto_ktp_driver,
      foto_sim_driver,
      status_driver,
    } = driverData;
    const [result] = await sequelize.query(
      `
      UPDATE driver
      SET id_user = ?, nik = ?, telpon_driver = ?, nama_kontak_darurat_driver = ?, telpon_kontak_darurat_driver = ?, masa_berlaku_sim = ?, foto_ktp_driver = ?, foto_sim_driver = ?, status_driver = ?
      WHERE id_driver = ?
    `,
      {
        replacements: [
          id_user,
          nik,
          telpon_driver,
          nama_kontak_darurat_driver,
          telpon_kontak_darurat_driver,
          masa_berlaku_sim,
          foto_ktp_driver,
          foto_sim_driver,
          status_driver,
          id_driver,
        ],
      }
    );
    return result.affectedRows > 0;
  },

  // Menghapus driver
  deleteDriver: async (id_driver) => {
    const [result] = await sequelize.query(
      `DELETE FROM driver WHERE id_driver = ?`,
      { replacements: [id_driver] }
    );
    return result.affectedRows > 0;
  },
};

export default Driver;