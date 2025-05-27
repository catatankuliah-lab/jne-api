import sequelize from "../config/config.js";
import { uploadRiwayatPO } from "../controller/riwayatPOController.js";

const RiwayatPO = {
  getRiwayatPO: async (page = 1, per_page = 10, filters = {}) => {
    try {
      const offset = (page - 1) * per_page;
      let whereClause = "WHERE 1=1";
      let replacements = { per_page: parseInt(per_page), offset: parseInt(offset) };

      if (filters.nomor_po) {
        whereClause += " AND riwayat_po.nomor_po LIKE :nomor_po";
        replacements.nomor_po = `%${filters.nomor_po}%`;
      }

      if (filters.nama_customer) {
        whereClause += " AND riwayat_po.nama_customer LIKE :nama_customer";
        replacements.nama_customer = `%${filters.nama_customer}%`;
      }

      if (filters.armada) {
        whereClause += " AND riwayat_po.armada LIKE :armada";
        replacements.armada = `%${filters.armada}%`;
      }

      if (filters.driver) {
        whereClause += " AND riwayat_po.driver LIKE :driver";
        replacements.driver = `%${filters.driver}%`;
      }

      if (filters.startDate && filters.endDate) {
        whereClause += " AND riwayat_po.tanggal_po BETWEEN :startDate AND :endDate";
        replacements.startDate = filters.startDate;
        replacements.endDate = filters.endDate;
      } else if (filters.startDate) {
        whereClause += " AND riwayat_po.tanggal_po >= :startDate";
        replacements.startDate = filters.startDate;
      } else if (filters.endDate) {
        whereClause += " AND riwayat_po.tanggal_po <= :endDate";
        replacements.endDate = filters.endDate;
      }

      if (filters.status_riwayat_po) {
        whereClause += " AND riwayat_po.status_riwayat_po = :status_riwayat_po";
        replacements.status_riwayat_po = filters.status_riwayat_po;
      }

      const query = `
      SELECT 
        *
      FROM riwayat_po
      ${whereClause}
      ORDER BY riwayat_po.id_riwayat_po DESC
      LIMIT :per_page OFFSET :offset;
    `;

      const data = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });

      const countQuery = `
      SELECT COUNT(*) AS total FROM riwayat_po
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
      throw new Error("Error fetching paginated data: " + error.message);
    }
  },
  // getRiwayatPO: async () => {
  //   const [results] = await sequelize.query(`
  //     SELECT 
  //       *
  //     FROM riwayat_po
  //   `);
  //   return results;
  // },

  getRiwayatPOByIdPO: async (id_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        *
      FROM riwayat_po
      WHERE riwayat_po.id_po = ?
    `,
      { replacements: [id_po] }
    );
    return results;
  },

  getRiwayatPOById: async (id_riwayat_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        riwayat_po.*,
        po.tarif_po
      FROM riwayat_po
      LEFT JOIN po ON riwayat_po.id_po = po.id_po
      WHERE riwayat_po.id_riwayat_po = ?
    `,
      { replacements: [id_riwayat_po] }
    );
    return results[0];
  },

  addRiwayatPO: async (id_po,
    nomor_po,
    tanggal_po,
    jam_stanby,
    jam_muat,
    nama_customer,
    origin,
    destination,
    armada,
    driver,
    jenis_muatan,
    catatan_po,
    file_sj,
    reguler_jarak_isi,
    reguler_solar_isi,
    reguler_jarak_kosong,
    reguler_solar_kosong,
    reguler_jam_tunggu,
    reguler_solar_tunggu,
    reguler_gaji_driver,
    reguler_tonase,
    reguler_kas_jalan,
    reguler_rute,
    reguler_catatan,
    kosongan_jarak_isi,
    kosongan_solar_isi,
    kosongan_jarak_kosong,
    kosongan_solar_kosong,
    kosongan_jam_tunggu,
    kosongan_solar_tunggu,
    kosongan_gaji_driver,
    kosongan_tonase,
    kosongan_kas_jalan,
    kosongan_rute,
    kosongan_catatan,
    tarif_ac,
    tarif_ban,
    tarif_po,
    status_riwayat_po) => {
    const result = await sequelize.query(
      `
INSERT INTO riwayat_po (
  id_po,
  nomor_po,
  tanggal_po,
  jam_stanby,
  jam_muat,
  nama_customer,
  origin,
  destination,
  armada,
  driver,
  jenis_muatan,
  catatan_po,
  file_sj,
  reguler_jarak_isi,
  reguler_solar_isi,
  reguler_jarak_kosong,
  reguler_solar_kosong,
  reguler_jam_tunggu,
  reguler_solar_tunggu,
  reguler_gaji_driver,
  reguler_tonase,
  reguler_kas_jalan,
  reguler_rute,
  reguler_catatan,
  kosongan_jarak_isi,
  kosongan_solar_isi,
  kosongan_jarak_kosong,
  kosongan_solar_kosong,
  kosongan_jam_tunggu,
  kosongan_solar_tunggu,
  kosongan_gaji_driver,
  kosongan_tonase,
  kosongan_kas_jalan,
  kosongan_rute,
  kosongan_catatan,
  tarif_ac,
  tarif_ban,
  tarif_po,
  status_riwayat_po
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

    `,
      {
        replacements: [
          id_po,
          nomor_po,
          tanggal_po,
          jam_stanby,
          jam_muat,
          nama_customer,
          origin,
          destination,
          armada,
          driver,
          jenis_muatan,
          catatan_po,
          file_sj,
          reguler_jarak_isi,
          reguler_solar_isi,
          reguler_jarak_kosong,
          reguler_solar_kosong,
          reguler_jam_tunggu,
          reguler_solar_tunggu,
          reguler_gaji_driver,
          reguler_tonase,
          reguler_kas_jalan,
          reguler_rute,
          reguler_catatan,
          kosongan_jarak_isi,
          kosongan_solar_isi,
          kosongan_jarak_kosong,
          kosongan_solar_kosong,
          kosongan_jam_tunggu,
          kosongan_solar_tunggu,
          kosongan_gaji_driver,
          kosongan_tonase,
          kosongan_kas_jalan,
          kosongan_rute,
          kosongan_catatan,
          tarif_ac,
          tarif_ban,
          tarif_po,
          status_riwayat_po
        ]
      }

    );
    return result[0];
  },

  getTitikBongkarById: async (id_titik_bongkar) => {
    const [results] = await sequelize.query(
      `
      SELECT 
      titik_bongkar.*,
      po.nomor_po,
      po.tanggal_po,
      po.status_po
      FROM titik_bongkar
      JOIN po ON titik_bongkar.id_po = po.id_po
      WHERE id_titik_bongkar = ?
    `,
      { replacements: [id_titik_bongkar] }
    );
    return results[0];
  },

  getStatusUploadBongkarByPO: async (id_po) => {
    const [results] = await sequelize.query(
      `
      SELECT
          titik_bongkar.id_po,
          po.id_armada,
          po.id_driver,
          COUNT(titik_bongkar.id_titik_bongkar) AS total_titik_bongkar,
          SUM(CASE
              WHEN titik_bongkar.foto_bongkar IS NOT NULL AND titik_bongkar.foto_bongkar != '' THEN 1
              ELSE 0
          END) AS jumlah_foto_terisi,
          CASE
              WHEN COUNT(*) = SUM(CASE WHEN titik_bongkar.foto_bongkar IS NOT NULL AND titik_bongkar.foto_bongkar != '' THEN 1 ELSE 0 END) THEN 'Lengkap'
              ELSE 'Belum Lengkap'
          END AS status_foto
      FROM
          titik_bongkar
      LEFT JOIN
          po ON po.id_po = titik_bongkar.id_po
      WHERE titik_bongkar.id_po = ?
    `,
      { replacements: [id_po] }
    );
    return results[0];
  },

  updateStatusRiwayatPO: async (id_riwayat_po, status_riwayat_po) => {
    const [result] = await sequelize.query(
      `
        UPDATE riwayat_po
          SET status_riwayat_po = ?
        WHERE id_riwayat_po = ?
      `,
      {
        replacements: [id_riwayat_po, status_riwayat_po],
      }
    );
    return result.affectedRows > 0;
  },

  uploadRiwayatPO: async (id_riwayat_po, FileFoto) => {
    const [result] = await sequelize.query(
      `
      UPDATE riwayat_po
        SET file_riwayat_po = ?
      WHERE id_riwayat_po = ?
    `,
      {
        replacements: [FileFoto, id_riwayat_po],
      }
    );
    return result.affectedRows > 0;
  }
};

export default RiwayatPO;
