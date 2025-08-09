import sequelize from "../config/config.js";

const Karyawan = {
  // ✅ Tambah Karyawan
  addKaryawan: async (data, options = {}) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
      INSERT INTO karyawan (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
      type: sequelize.QueryTypes.INSERT,
      ...options,
    });

    return result[0];
  },

  getAllKaryawan: async (filters = {}) => {
    let baseQuery = `
     SELECT
        karyawan.*,
        departemen.id_departemen,
        departemen.nama_departemen,
        bagian.id_bagian,
        bagian.nama_bagian,
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
        users.*
      FROM karyawan
      JOIN users ON karyawan.id_user = users.id_user
      JOIN bagian ON karyawan.id_bagian = bagian.id_bagian
      JOIN departemen ON departemen.id_departemen = bagian.id_departemen
      JOIN kantor ON karyawan.id_kantor = kantor.id_kantor
      JOIN desa_kelurahan ON karyawan.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan
      JOIN kecamatan ON desa_kelurahan.kode_kecamatan = kecamatan.kode_kecamatan
      JOIN kabupaten_kota ON kecamatan.kode_kabupaten_kota = kabupaten_kota.kode_kabupaten_kota
      JOIN provinsi ON kabupaten_kota.kode_provinsi = provinsi.kode_provinsi
      JOIN status_karyawan ON karyawan.id_status_karyawan = status_karyawan.id_status_karyawan
    WHERE karyawan.is_deleted = 0
  `;

    const replacements = {};

    // Filter id_bagian
    if (Array.isArray(filters.id_bagian) && filters.id_bagian.length > 0) {
      const placeholders = filters.id_bagian
        .map((_, i) => `:id_bagian_${i}`)
        .join(", ");
      baseQuery += ` AND karyawan.id_bagian IN (${placeholders})`;
      filters.id_bagian.forEach((val, i) => {
        replacements[`id_bagian_${i}`] = val;
      });
    }

    // Filter id_departemen
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

    baseQuery += ` ORDER BY karyawan.nama ASC`;

    const result = await sequelize.query(baseQuery, {
      replacements,
      type: sequelize.QueryTypes.SELECT,
    });

    return result;
  },

  // ✅ Get Detail Karyawan by ID
  getKaryawanById: async (id) => {
    const query = `
      SELECT
        karyawan.*,
        departemen.id_departemen,
        departemen.nama_departemen,
        bagian.id_bagian,
        bagian.nama_bagian,
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
        users.*
      FROM karyawan
      JOIN users ON karyawan.id_user = users.id_user
      JOIN bagian ON karyawan.id_bagian = bagian.id_bagian
      JOIN departemen ON departemen.id_departemen = bagian.id_departemen
      JOIN kantor ON karyawan.id_kantor = kantor.id_kantor
      JOIN desa_kelurahan ON karyawan.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan
      JOIN kecamatan ON desa_kelurahan.kode_kecamatan = kecamatan.kode_kecamatan
      JOIN kabupaten_kota ON kecamatan.kode_kabupaten_kota = kabupaten_kota.kode_kabupaten_kota
      JOIN provinsi ON kabupaten_kota.kode_provinsi = provinsi.kode_provinsi
      WHERE karyawan.id_karyawan = ? AND karyawan.is_deleted = 0
      LIMIT 1
    `;

    const result = await sequelize.query(query, {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT,
    });

    return result[0];
  },

  // ✅ Update Karyawan
  updateKaryawan: async (id_karyawan, data, options = {}) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      throw new Error("Tidak ada data untuk di-update.");
    }

    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    const query = `
    UPDATE karyawan
    SET ${setClause}
    WHERE id_karyawan = ? AND is_deleted = 0
  `;

    values.push(id_karyawan);

    const result = await sequelize.query(query, {
      replacements: values,
      type: sequelize.QueryTypes.UPDATE,
      ...options,
    });

    return result;
  },

  // ✅ Soft Delete Karyawan
  deleteKaryawan: async (id, updatedBy) => {
    const query = `
      UPDATE karyawan
      SET is_deleted = 1, updated_by = ?
      WHERE id_karyawan = ?
    `;

    const result = await sequelize.query(query, {
      replacements: [updatedBy, id],
    });

    return result[0];
  },
};

export default Karyawan;