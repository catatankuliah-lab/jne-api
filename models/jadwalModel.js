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
};

export default Jadwal;
