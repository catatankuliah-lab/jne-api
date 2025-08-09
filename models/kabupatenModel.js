import sequelize from "../config/config.js";

const Kabupaten = {
  // Get all Kabupaten
  getAllKabupaten: async () => {
    const [results] = await sequelize.query(
      "SELECT * FROM kabupaten_kota ORDER BY nama_kabupaten_kota ASC"
    );
    return results;
  },

  // Get all Kabupaten By Kode Provinsi
  getByKodeProvinsi: async (kode_provinsi) => {
    const result = await sequelize.query(
      `SELECT * FROM kabupaten_kota WHERE kode_provinsi = ? ORDER BY nama_kabupaten_kota ASC`,
      {
        replacements: [kode_provinsi],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },

  // Get all Kabupaten Id Kantor
  getByIdKantor: async (id_kantor) => {
    const result = await sequelize.query(
      `SELECT k.*
      FROM kabupaten_kota k
      JOIN wilayah_kerja w ON k.kode_kabupaten_kota = w.kode_kabupaten_kota
      WHERE w.id_kantor = ?
      ORDER BY k.nama_kabupaten_kota ASC`,
      {
        replacements: [id_kantor],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },

  getRealisasiPusat: async ({
    kode_kabupaten_kota,
    id_alokasi,
    nama_kantor,
  }) => {
    let query = `
    SELECT 
      k.kode_kabupaten_kota,
      k.nama_kabupaten_kota,
      p.nama_provinsi,
      ka.nama_kantor,
      t.id_alokasi,
      COALESCE(t.total_target_pbp, 0) AS total_target_pbp,
      COALESCE(r.total_pbp_salur, 0) AS total_pbp_salur
    FROM kabupaten_kota k
    JOIN provinsi p ON k.kode_provinsi = p.kode_provinsi
    JOIN wilayah_kerja w ON k.kode_kabupaten_kota = w.kode_kabupaten_kota
    JOIN kantor ka ON w.id_kantor = ka.id_kantor
    LEFT JOIN (
      SELECT 
        kk.kode_kabupaten_kota,
        tp.id_alokasi,
        SUM(tp.target_pbp) AS total_target_pbp
      FROM target_penyaluran tp
      JOIN desa_kelurahan d ON tp.kode_desa_kelurahan = d.kode_desa_kelurahan
      JOIN kecamatan kc ON d.kode_kecamatan = kc.kode_kecamatan
      JOIN kabupaten_kota kk ON kc.kode_kabupaten_kota = kk.kode_kabupaten_kota
      WHERE 1 = 1
      ${id_alokasi ? "AND tp.id_alokasi = :id_alokasi" : ""}
      GROUP BY kk.kode_kabupaten_kota, tp.id_alokasi
    ) t ON k.kode_kabupaten_kota = t.kode_kabupaten_kota
    LEFT JOIN (
      SELECT 
        kk.kode_kabupaten_kota,
        SUM(dl.jumlah_pbp_salur) AS total_pbp_salur
      FROM detail_lo dl
      LEFT JOIN lo l ON dl.id_lo = l.id_lo
      LEFT JOIN wo w ON l.id_wo = w.id_wo
      LEFT JOIN detail_wo dw ON dl.id_detail_wo = dw.id_detail_wo
      LEFT JOIN desa_kelurahan d ON dw.kode_desa_kelurahan = d.kode_desa_kelurahan
      LEFT JOIN kecamatan kc ON d.kode_kecamatan = kc.kode_kecamatan
      LEFT JOIN kabupaten_kota kk ON kc.kode_kabupaten_kota = kk.kode_kabupaten_kota
      GROUP BY kk.kode_kabupaten_kota
    ) r ON k.kode_kabupaten_kota = r.kode_kabupaten_kota
    WHERE 1 = 1
    ${
      kode_kabupaten_kota
        ? "AND k.kode_kabupaten_kota = :kode_kabupaten_kota"
        : ""
    }
    ${nama_kantor ? "AND ka.nama_kantor LIKE :nama_kantor" : ""}
    ORDER BY k.nama_kabupaten_kota ASC
  `;
    const result = await sequelize.query(query, {
      replacements: {
        ...(kode_kabupaten_kota && { kode_kabupaten_kota }),
        ...(id_alokasi && { id_alokasi }),
        ...(nama_kantor && { nama_kantor: `%${nama_kantor}%` }),
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  getRealisasiByIdKantor: async ({
    id_kantor,
    kode_kabupaten_kota,
    id_alokasi,
  }) => {
    let query = `
    SELECT 
      k.kode_kabupaten_kota,
      k.nama_kabupaten_kota,
      t.id_alokasi,
      COALESCE(t.total_target_pbp, 0) AS total_target_pbp,
      COALESCE(r.total_pbp_salur, 0) AS total_pbp_salur
    FROM kabupaten_kota k
    JOIN wilayah_kerja w ON k.kode_kabupaten_kota = w.kode_kabupaten_kota
    LEFT JOIN (
      SELECT 
        kk.kode_kabupaten_kota,
        tp.id_alokasi,
        SUM(tp.target_pbp) AS total_target_pbp
      FROM target_penyaluran tp
      JOIN desa_kelurahan d ON tp.kode_desa_kelurahan = d.kode_desa_kelurahan
      JOIN kecamatan kc ON d.kode_kecamatan = kc.kode_kecamatan
      JOIN kabupaten_kota kk ON kc.kode_kabupaten_kota = kk.kode_kabupaten_kota
      WHERE 1 = 1
      ${id_alokasi ? "AND tp.id_alokasi = :id_alokasi" : ""}
      GROUP BY kk.kode_kabupaten_kota, tp.id_alokasi
    ) t ON k.kode_kabupaten_kota = t.kode_kabupaten_kota
    LEFT JOIN (
      SELECT 
        kk.kode_kabupaten_kota,
        SUM(dl.jumlah_pbp_salur) AS total_pbp_salur
      FROM detail_lo dl
      LEFT JOIN lo l ON dl.id_lo = l.id_lo
      LEFT JOIN wo w ON l.id_wo = w.id_wo
      LEFT JOIN detail_wo dw ON dl.id_detail_wo = dw.id_detail_wo
      LEFT JOIN desa_kelurahan d ON dw.kode_desa_kelurahan = d.kode_desa_kelurahan
      LEFT JOIN kecamatan kc ON d.kode_kecamatan = kc.kode_kecamatan
      LEFT JOIN kabupaten_kota kk ON kc.kode_kabupaten_kota = kk.kode_kabupaten_kota
      GROUP BY kk.kode_kabupaten_kota
    ) r ON k.kode_kabupaten_kota = r.kode_kabupaten_kota
    WHERE w.id_kantor = :id_kantor
    ${
      kode_kabupaten_kota
        ? "AND k.kode_kabupaten_kota = :kode_kabupaten_kota"
        : ""
    }
    ORDER BY k.nama_kabupaten_kota ASC
  `;

    const result = await sequelize.query(query, {
      replacements: {
        id_kantor,
        ...(kode_kabupaten_kota && { kode_kabupaten_kota }),
        ...(id_alokasi && { id_alokasi }),
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },
};

export default Kabupaten;
