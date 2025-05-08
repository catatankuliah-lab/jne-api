import sequelize from "../config/config.js";

const ItemDetailArmada = {
  // Ambil semua data item detail armada, join dengan kendaraan_masuk
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

  // Tambah data item_detail_armada
  add: async (
    id_kendaraan_masuk,
    kondisi_mobil_tampak_depan,
    keterangan_mobil_tampak_depan,
    foto_mobil_tampak_depan,
    kondisi_mobil_tampak_belakang,
    keterangan_mobil_tampak_belakang,
    foto_mobil_tampak_belakang,
    kondisi_mobil_tampak_kanan,
    keterangan_mobil_tampak_kanan,
    foto_mobil_tampak_kanan,
    kondisi_mobil_tampak_kiri,
    keterangan_mobil_tampak_kiri,
    foto_mobil_tampak_kiri,
    kondisi_mesin_atas,
    keterangan_mesin_atas,
    foto_mesin_atas,
    kondisi_mesin_kanan,
    keterangan_mesin_kanan,
    foto_mesin_kanan,
    kondisi_mesin_kiri,
    keterangan_mesin_kiri,
    foto_mesin_kiri,
    kondisi_power_stering,
    keterangan_power_stering,
    foto_power_stering,
    kondisi_draglink,
    keterangan_draglink,
    foto_draglink,
    kondisi_frame_mounting_dudukan_kabin,
    keterangan_frame_mounting_dudukan_kabin,
    foto_frame_mounting_dudukan_kabin,
    kondisi_gardan,
    keterangan_gardan,
    foto_gardan,
    kondisi_accu_aki,
    keterangan_accu_aki,
    foto_accu_aki,
    kondisi_ban_depan_kanan,
    keterangan_ban_depan_kanan,
    foto_ban_depan_kanan,
    kondisi_ban_depan_kiri,
    keterangan_ban_depan_kiri,
    foto_ban_depan_kiri,
    kondisi_ban_belakang_kanan_luar,
    keterangan_ban_belakang_kanan_luar,
    foto_ban_belakang_kanan_luar,
    kondisi_ban_belakang_kanan_dalam,
    keterangan_ban_belakang_kanan_dalam,
    foto_ban_belakang_kanan_dalam,
    kondisi_ban_belakang_kiri_luar,
    keterangan_ban_belakang_kiri_luar,
    foto_ban_belakang_kiri_luar,
    kondisi_ban_belakang_kiri_dalam,
    keterangan_ban_belakang_kiri_dalam,
    foto_ban_belakang_kiri_dalam,
    kondisi_kembang_ban_depan_kanan,
    keterangan_kembang_ban_depan_kanan,
    foto_kembang_ban_depan_kanan,
    kondisi_kembang_ban_depan_kiri,
    keterangan_kembang_ban_depan_kiri,
    foto_kembang_ban_depan_kiri,
    kondisi_kembang_ban_belakang_kanan,
    keterangan_kembang_ban_belakang_kanan,
    foto_kembang_ban_belakang_kanan,
    kondisi_kembang_ban_belakang_kiri,
    keterangan_kembang_ban_belakang_kiri,
    foto_kembang_ban_belakang_kiri
  ) => {
    const result = await sequelize.query(
      `
      INSERT INTO item_detail_armada (
        id_kendaraan_masuk,
        kondisi_mobil_tampak_depan,
        keterangan_mobil_tampak_depan,
        foto_mobil_tampak_depan,
        kondisi_mobil_tampak_belakang,
        keterangan_mobil_tampak_belakang,
        foto_mobil_tampak_belakang,
        kondisi_mobil_tampak_kanan,
        keterangan_mobil_tampak_kanan,
        foto_mobil_tampak_kanan,
        kondisi_mobil_tampak_kiri,
        keterangan_mobil_tampak_kiri,
        foto_mobil_tampak_kiri,
        kondisi_mesin_atas,
        keterangan_mesin_atas,
        foto_mesin_atas,
        kondisi_mesin_kanan,
        keterangan_mesin_kanan,
        foto_mesin_kanan,
        kondisi_mesin_kiri,
        keterangan_mesin_kiri,
        foto_mesin_kiri,
        kondisi_power_stering,
        keterangan_power_stering,
        foto_power_stering,
        kondisi_draglink,
        keterangan_draglink,
        foto_draglink,
        kondisi_frame_mounting_dudukan_kabin,
        keterangan_frame_mounting_dudukan_kabin,
        foto_frame_mounting_dudukan_kabin,
        kondisi_gardan,
        keterangan_gardan,
        foto_gardan,
        kondisi_accu_aki,
        keterangan_accu_aki,
        foto_accu_aki,
        kondisi_ban_depan_kanan,
        keterangan_ban_depan_kanan,
        foto_ban_depan_kanan,
        kondisi_ban_depan_kiri,
        keterangan_ban_depan_kiri,
        foto_ban_depan_kiri,
        kondisi_ban_belakang_kanan_luar,
        keterangan_ban_belakang_kanan_luar,
        foto_ban_belakang_kanan_luar,
        kondisi_ban_belakang_kanan_dalam,
        keterangan_ban_belakang_kanan_dalam,
        foto_ban_belakang_kanan_dalam,
        kondisi_ban_belakang_kiri_luar,
        keterangan_ban_belakang_kiri_luar,
        foto_ban_belakang_kiri_luar,
        kondisi_ban_belakang_kiri_dalam,
        keterangan_ban_belakang_kiri_dalam,
        foto_ban_belakang_kiri_dalam,
        kondisi_kembang_ban_depan_kanan,
        keterangan_kembang_ban_depan_kanan,
        foto_kembang_ban_depan_kanan,
        kondisi_kembang_ban_depan_kiri,
        keterangan_kembang_ban_depan_kiri,
        foto_kembang_ban_depan_kiri,
        kondisi_kembang_ban_belakang_kanan,
        keterangan_kembang_ban_belakang_kanan,
        foto_kembang_ban_belakang_kanan,
        kondisi_kembang_ban_belakang_kiri,
        keterangan_kembang_ban_belakang_kiri,
        foto_kembang_ban_belakang_kiri
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `,
      {
        replacements: [
          id_kendaraan_masuk,
          kondisi_mobil_tampak_depan,
          keterangan_mobil_tampak_depan,
          foto_mobil_tampak_depan,
          kondisi_mobil_tampak_belakang,
          keterangan_mobil_tampak_belakang,
          foto_mobil_tampak_belakang,
          kondisi_mobil_tampak_kanan,
          keterangan_mobil_tampak_kanan,
          foto_mobil_tampak_kanan,
          kondisi_mobil_tampak_kiri,
          keterangan_mobil_tampak_kiri,
          foto_mobil_tampak_kiri,
          kondisi_mesin_atas,
          keterangan_mesin_atas,
          foto_mesin_atas,
          kondisi_mesin_kanan,
          keterangan_mesin_kanan,
          foto_mesin_kanan,
          kondisi_mesin_kiri,
          keterangan_mesin_kiri,
          foto_mesin_kiri,
          kondisi_power_stering,
          keterangan_power_stering,
          foto_power_stering,
          kondisi_draglink,
          keterangan_draglink,
          foto_draglink,
          kondisi_frame_mounting_dudukan_kabin,
          keterangan_frame_mounting_dudukan_kabin,
          foto_frame_mounting_dudukan_kabin,
          kondisi_gardan,
          keterangan_gardan,
          foto_gardan,
          kondisi_accu_aki,
          keterangan_accu_aki,
          foto_accu_aki,
          kondisi_ban_depan_kanan,
          keterangan_ban_depan_kanan,
          foto_ban_depan_kanan,
          kondisi_ban_depan_kiri,
          keterangan_ban_depan_kiri,
          foto_ban_depan_kiri,
          kondisi_ban_belakang_kanan_luar,
          keterangan_ban_belakang_kanan_luar,
          foto_ban_belakang_kanan_luar,
          kondisi_ban_belakang_kanan_dalam,
          keterangan_ban_belakang_kanan_dalam,
          foto_ban_belakang_kanan_dalam,
          kondisi_ban_belakang_kiri_luar,
          keterangan_ban_belakang_kiri_luar,
          foto_ban_belakang_kiri_luar,
          kondisi_ban_belakang_kiri_dalam,
          keterangan_ban_belakang_kiri_dalam,
          foto_ban_belakang_kiri_dalam,
          kondisi_kembang_ban_depan_kanan,
          keterangan_kembang_ban_depan_kanan,
          foto_kembang_ban_depan_kanan,
          kondisi_kembang_ban_depan_kiri,
          keterangan_kembang_ban_depan_kiri,
          foto_kembang_ban_depan_kiri,
          kondisi_kembang_ban_belakang_kanan,
          keterangan_kembang_ban_belakang_kanan,
          foto_kembang_ban_belakang_kanan,
          kondisi_kembang_ban_belakang_kiri,
          keterangan_kembang_ban_belakang_kiri,
          foto_kembang_ban_belakang_kiri
        ],
        
      }
    );
    return result[0].insertId;
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
