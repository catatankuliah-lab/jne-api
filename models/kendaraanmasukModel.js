import sequelize from "../config/config.js";

const KendaraanMasuk = {
  getAll: async (page = 1, per_page = 10, filters = {}) => {
    try {
      const offset = (page - 1) * per_page;
      let whereClause = "WHERE 1=1";
      let replacements = { per_page: parseInt(per_page), offset: parseInt(offset) };

      if (filters.nama_driver) {
        whereClause += " AND driver.nama_driver LIKE :nama_driver";
        replacements.nama_driver = `%${filters.nama_driver}%`;
      }

      if (filters.nopol_armada) {
        whereClause += " AND armada.nopol_armada LIKE :nopol_armada";
        replacements.nopol_armada = `%${filters.nopol_armada}%`;
      }

      if (filters.startDate && filters.endDate) {
        whereClause += " AND kendaraan_masuk.tanggal_masuk BETWEEN :startDate AND :endDate";
        replacements.startDate = filters.startDate;
        replacements.endDate = filters.endDate;
      } else if (filters.startDate) {
        whereClause += " AND kendaraan_masuk.tanggal_masuk >= :startDate";
        replacements.startDate = filters.startDate;
      } else if (filters.endDate) {
        whereClause += " AND kendaraan_masuk.tanggal_masuk <= :endDate";
        replacements.endDate = filters.endDate;
      }

      const query = `
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
        JOIN driver ON kendaraan_masuk.id_driver = driver.id_driver
        ${whereClause}
        ORDER BY kendaraan_masuk.id_kendaraan_masuk DESC
        LIMIT :per_page OFFSET :offset;
      `;

      const data = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });

      const countQuery = `
        SELECT COUNT(*) AS total
        FROM kendaraan_masuk
        JOIN armada ON kendaraan_masuk.id_armada = armada.id_armada
        JOIN driver ON kendaraan_masuk.id_driver = driver.id_driver
        ${whereClause};
      `;

      const [countResult] = await sequelize.query(countQuery, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });

      return {
        data,
        total: countResult.total,
        page,
        per_page,
      };
    } catch (error) {
      throw new Error("Error fetching kendaraan masuk: " + error.message);
    }
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
