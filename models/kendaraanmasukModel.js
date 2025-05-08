import sequelize from "../config/config.js";

const KendaraanMasuk = {
  // Ambil semua data kendaraan masuk
  getAll: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        kendaraan_masuk.id_kendaraan_masuk,
        kendaraan_masuk.id_driver,
        kendaraan_masuk.id_armada,
        armada.nopol_armada,
        driver.nama_driver,
        kendaraan_masuk.tanggal_masuk,
        kendaraan_masuk.solar_tangka,
        kendaraan_masuk.solar_jarum,
        kendaraan_masuk.solar_amper,
        kendaraan_masuk.solar_aplikasi,
        kendaraan_masuk.kebersihan_kendaraan,
        kendaraan_masuk.fisik_kendaraan
      FROM kendaraan_masuk
      JOIN armada ON kendaraan_masuk.id_armada = armada.id_armada
      JOIN driver ON kendaraan_masuk.id_driver = driver.id_driver;
    `);
    return results;
  },

  // Ambil data berdasarkan ID
  getById: async (id_kendaraan_masuk) => {
    const [results] = await sequelize.query(
      `SELECT * FROM kendaraan_masuk WHERE id_kendaraan_masuk = ?`,
      {
        replacements: [id_kendaraan_masuk],
      }
    );
    return results[0]; // hanya ambil 1 record
  },

  // Tambah data kendaraan masuk
  add: async (id_driver, id_armada, tanggal_masuk, solar_tangka, solar_jarum, solar_amper, solar_aplikasi, kebersihan_kendaraan, fisik_kendaraan) => {
    const result = await sequelize.query(
      `
      INSERT INTO kendaraan_masuk (
        id_driver,
        id_armada,
        tanggal_masuk,
        solar_tangka,
        solar_jarum,
        solar_amper,
        solar_aplikasi,
        kebersihan_kendaraan,
        fisik_kendaraan
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_driver,
          id_armada,
          tanggal_masuk,
          solar_tangka,
          solar_jarum,
          solar_amper,
          solar_aplikasi,
          kebersihan_kendaraan,
          fisik_kendaraan
        ],
      }
    );
    return result[0];
  },

  // Update data kendaraan masuk
  update: async (id_kendaraan_masuk, data) => {
    const {
      id_driver,
      id_armada,
      tanggal_masuk,
      solar_tangka,
      solar_jarum,
      solar_amper,
      solar_aplikasi,
      kebersihan_kendaraan,
      fisik_kendaraan,
    } = data;

    const [result] = await sequelize.query(
      `
      UPDATE kendaraan_masuk
      SET
        id_driver = ?,
        id_armada = ?,
        tanggal_masuk = ?,
        solar_tangka = ?,
        solar_jarum = ?,
        solar_amper = ?,
        solar_aplikasi = ?,
        kebersihan_kendaraan = ?,
        fisik_kendaraan = ?
      WHERE id_kendaraan_masuk = ?
    `,
      {
        replacements: [
          id_driver,
          id_armada,
          tanggal_masuk,
          solar_tangka,
          solar_jarum,
          solar_amper,
          solar_aplikasi,
          kebersihan_kendaraan,
          fisik_kendaraan,
          id_kendaraan_masuk,
        ],
      }
    );
    return result.affectedRows > 0;
  },

  // Hapus data
  delete: async (id_kendaraan_masuk) => {
    const [result] = await sequelize.query(
      `DELETE FROM kendaraan_masuk WHERE id_kendaraan_masuk = ?`,
      {
        replacements: [id_kendaraan_masuk],
      }
    );
    return result.affectedRows > 0;
  },
};

export default KendaraanMasuk;
