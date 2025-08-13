import sequelize from "../config/config.js";

const Jadwal = {
  addBulkJadwal: async (dataArray) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return [];

    const keys = Object.keys(dataArray[0]);
    const fields = keys.join(", ");
    const placeholders = dataArray
      .map(() => `(${keys.map(() => "?").join(", ")})`)
      .join(", ");
    const values = dataArray.flatMap((item) => keys.map((key) => item[key]));

    // Filter kolom yang tidak termasuk UNIQUE constraint
    const updateKeys = keys.filter(
      (key) => !["id_karyawan", "tanggal", "bulan", "tahun"].includes(key)
    );

    const updates = updateKeys
      .map((key) => `${key} = VALUES(${key})`)
      .join(", ");

    const query = `
      INSERT INTO jadwal_shift (${fields})
      VALUES ${placeholders}
      ${updates ? `ON DUPLICATE KEY UPDATE ${updates}` : ""}
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  getJadwalByKaryawanAndTanggal: async ({
    id_karyawan,
    tanggal,
    bulan,
    tahun,
  }) => {
    const query = `
    SELECT 
      jadwal_shift.*,
      shift.jam_masuk,
      shift.jam_pulang,
      kantor.latitude,
      kantor.longitude
    FROM jadwal_shift
    JOIN shift ON shift.id_shift = jadwal_shift.id_shift
    JOIN karyawan ON karyawan.id_karyawan = jadwal_shift.id_karyawan
    JOIN kantor ON kantor.id_kantor = karyawan.id_kantor
    WHERE jadwal_shift.id_karyawan = ?
      AND jadwal_shift.tanggal = ?
      AND jadwal_shift.bulan = ?
      AND jadwal_shift.tahun = ?
      AND jadwal_shift.is_deleted = 0
  `;

    const result = await sequelize.query(query, {
      replacements: [id_karyawan, tanggal, bulan, tahun],
      type: sequelize.QueryTypes.SELECT,
    });

    return result[0];
  },

  getJadwalFiltered: async (filters = {}) => {
    let baseQuery = `
    SELECT
      karyawan.id_karyawan,
      karyawan.nama,
      bagian.id_bagian,
      bagian.nama_bagian,
      departemen.id_departemen,
      departemen.nama_departemen,
      desa_kelurahan.kode_desa_kelurahan,
      desa_kelurahan.nama_desa_kelurahan,
      kecamatan.kode_kecamatan,
      kecamatan.nama_kecamatan,
      kabupaten_kota.kode_kabupaten_kota,
      kabupaten_kota.nama_kabupaten_kota,
      provinsi.kode_provinsi,
      provinsi.nama_provinsi,
      kantor.id_kantor,
      kantor.nama_kantor,
      status_karyawan.keterangan_status_karyawan,
      status_karyawan.kode_status_karyawan,
      jadwal_shift.bulan,
      jadwal_shift.tahun,
      MIN(jadwal_shift.tanggal) as tanggal_shift_pertama
    FROM jadwal_shift
    JOIN karyawan ON jadwal_shift.id_karyawan = karyawan.id_karyawan
    JOIN bagian ON karyawan.id_bagian = bagian.id_bagian
    JOIN departemen ON bagian.id_departemen = departemen.id_departemen
    JOIN kantor ON karyawan.id_kantor = kantor.id_kantor
    JOIN desa_kelurahan ON karyawan.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan
    JOIN kecamatan ON desa_kelurahan.kode_kecamatan = kecamatan.kode_kecamatan
    JOIN kabupaten_kota ON kecamatan.kode_kabupaten_kota = kabupaten_kota.kode_kabupaten_kota
    JOIN provinsi ON kabupaten_kota.kode_provinsi = provinsi.kode_provinsi
    JOIN status_karyawan ON karyawan.id_status_karyawan = status_karyawan.id_status_karyawan
    WHERE jadwal_shift.is_deleted = 0
  `;

    const replacements = {};

    // Filters (sama kayak sebelumnya)
    if (Array.isArray(filters.id_karyawan) && filters.id_karyawan.length > 0) {
      const placeholders = filters.id_karyawan
        .map((_, i) => `:id_karyawan_${i}`)
        .join(", ");
      baseQuery += ` AND karyawan.id_karyawan IN (${placeholders})`;
      filters.id_karyawan.forEach((val, i) => {
        replacements[`id_karyawan_${i}`] = val;
      });
    }

    if (Array.isArray(filters.id_bagian) && filters.id_bagian.length > 0) {
      const placeholders = filters.id_bagian
        .map((_, i) => `:id_bagian_${i}`)
        .join(", ");
      baseQuery += ` AND bagian.id_bagian IN (${placeholders})`;
      filters.id_bagian.forEach((val, i) => {
        replacements[`id_bagian_${i}`] = val;
      });
    }

    if (
      Array.isArray(filters.id_departemen) &&
      filters.id_departemen.length > 0
    ) {
      const placeholders = filters.id_departemen
        .map((_, i) => `:id_departemen_${i}`)
        .join(", ");
      baseQuery += ` AND departemen.id_departemen IN (${placeholders})`;
      filters.id_departemen.forEach((val, i) => {
        replacements[`id_departemen_${i}`] = val;
      });
    }

    if (filters.tanggal) {
      baseQuery += ` AND jadwal_shift.tanggal = :tanggal`;
      replacements.tanggal = filters.tanggal;
    }

    if (filters.bulan) {
      baseQuery += ` AND jadwal_shift.bulan = :bulan`;
      replacements.bulan = filters.bulan;
    }

    if (filters.tahun) {
      baseQuery += ` AND jadwal_shift.tahun = :tahun`;
      replacements.tahun = filters.tahun;
    }

    baseQuery += `
    GROUP BY
      karyawan.id_karyawan,
      karyawan.nama,
      bagian.id_bagian,
      bagian.nama_bagian,
      departemen.id_departemen,
      departemen.nama_departemen,
      desa_kelurahan.kode_desa_kelurahan,
      desa_kelurahan.nama_desa_kelurahan,
      kecamatan.kode_kecamatan,
      kecamatan.nama_kecamatan,
      kabupaten_kota.kode_kabupaten_kota,
      kabupaten_kota.nama_kabupaten_kota,
      provinsi.kode_provinsi,
      provinsi.nama_provinsi,
      kantor.id_kantor,
      kantor.nama_kantor,
      status_karyawan.keterangan_status_karyawan,
      status_karyawan.kode_status_karyawan,
      jadwal_shift.bulan,
      jadwal_shift.tahun
    ORDER BY tanggal_shift_pertama ASC
  `;

    const result = await sequelize.query(baseQuery, {
      replacements,
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  getDetailJadwal: async (filters = {}) => {
    let baseQuery = `
    SELECT
      karyawan.id_karyawan,
      karyawan.nama,
      bagian.id_bagian,
      bagian.nama_bagian,
      departemen.id_departemen,
      departemen.nama_departemen,
      desa_kelurahan.kode_desa_kelurahan,
      desa_kelurahan.nama_desa_kelurahan,
      kecamatan.kode_kecamatan,
      kecamatan.nama_kecamatan,
      kabupaten_kota.kode_kabupaten_kota,
      kabupaten_kota.nama_kabupaten_kota,
      provinsi.kode_provinsi,
      provinsi.nama_provinsi,
      kantor.id_kantor,
      kantor.nama_kantor,
      status_karyawan.keterangan_status_karyawan,
      status_karyawan.kode_status_karyawan,
      jadwal_shift.tanggal,
      jadwal_shift.bulan,
      jadwal_shift.bulan,
      jadwal_shift.tahun,
      shift.nama_shift,
      shift.jam_masuk,
      shift.jam_pulang
    FROM jadwal_shift
    JOIN karyawan ON jadwal_shift.id_karyawan = karyawan.id_karyawan
    JOIN shift ON jadwal_shift.id_shift = shift.id_shift
    JOIN bagian ON karyawan.id_bagian = bagian.id_bagian
    JOIN departemen ON bagian.id_departemen = departemen.id_departemen
    JOIN kantor ON karyawan.id_kantor = kantor.id_kantor
    JOIN desa_kelurahan ON karyawan.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan
    JOIN kecamatan ON desa_kelurahan.kode_kecamatan = kecamatan.kode_kecamatan
    JOIN kabupaten_kota ON kecamatan.kode_kabupaten_kota = kabupaten_kota.kode_kabupaten_kota
    JOIN provinsi ON kabupaten_kota.kode_provinsi = provinsi.kode_provinsi
    JOIN status_karyawan ON karyawan.id_status_karyawan = status_karyawan.id_status_karyawan
    WHERE jadwal_shift.is_deleted = 0
  `;

    const replacements = {};

    if (filters.id_karyawan) {
      baseQuery += ` AND karyawan.id_karyawan = :id_karyawan`;
      replacements.id_karyawan = filters.id_karyawan;
    }

    if (filters.bulan) {
      baseQuery += ` AND jadwal_shift.bulan = :bulan`;
      replacements.bulan = filters.bulan;
    }

    if (filters.tahun) {
      baseQuery += ` AND jadwal_shift.tahun = :tahun`;
      replacements.tahun = filters.tahun;
    }

    baseQuery += `
    ORDER BY jadwal_shift.tanggal ASC
  `;

    const result = await sequelize.query(baseQuery, {
      replacements,
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },
};

export default Jadwal;
