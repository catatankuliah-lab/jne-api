import sequelize from "../config/config.js";
import { uploadRiwayatPO } from "../controller/riwayatPOController.js";

const RiwayatPO = {

  getRiwayatPO: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        *
      FROM riwayat_po
    `);
    return results;
  },

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
        *
      FROM riwayat_po
      WHERE riwayat_po.id_riwayat_po = ?
    `,
      { replacements: [id_riwayat_po] }
    );
    return results;
  },

  addRiwayatPO: async (id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar, shareloc, nama_penerima, nomor_penerima) => {
    const result = await sequelize.query(
      `
      INSERT INTO titik_bongkar (id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar, shareloc, nama_penerima, nomor_penerima)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar, shareloc, nama_penerima, nomor_penerima],
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
