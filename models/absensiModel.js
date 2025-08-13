import sequelize from "../config/config.js";
import { QueryTypes } from "sequelize";

const Absensi = {
  // ✅ Tambah Absensi
  addAbsensiMasuk: async (data) => {
    console.log("INSERT DATA KE DATABASE:", data);
    const keys = Object.keys(data);
    const values = Object.values(data);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
      INSERT INTO absensi (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  cekAbsensiHariIni: async (id_karyawan, tanggal) => {
    const query = `
      SELECT *
      FROM absensi
      WHERE id_karyawan = ?
      AND tanggal = ?
      LIMIT 1
    `;

    const result = await sequelize.query(query, {
      replacements: [id_karyawan, tanggal],
      type: QueryTypes.SELECT,
    });

    return result[0] || null;
  },

  updateAbsensiPulang: async (id_absensi, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    const query = `
    UPDATE absensi
    SET ${setClause}
    WHERE id_absensi = ?
  `;

    const result = await sequelize.query(query, {
      replacements: [...values, id_absensi],
      type: QueryTypes.UPDATE,
    });

    return result;
  },

  getAbsensiByBulanTahun: async (id_karyawan, bulan, tahun) => {
    const query = `
    SELECT
      jadwal_shift.tahun,
      jadwal_shift.bulan,
      jadwal_shift.tanggal,
      absensi.jam_masuk,
      shift.jam_masuk AS shift_jam_masuk,
      cuti_izin.jenis,
      cuti_izin.status AS status_cuti_izin,
      CASE
        WHEN STR_TO_DATE(
          CONCAT(
            jadwal_shift.tahun, '-',
            LPAD(jadwal_shift.bulan, 2, '0'), '-',
            LPAD(jadwal_shift.tanggal, 2, '0')
          ), '%Y-%m-%d'
        ) > CURDATE() THEN ''
        WHEN absensi.jam_masuk IS NOT NULL THEN
          CASE
            WHEN absensi.jam_masuk > shift.jam_masuk THEN 'TELAT'
            ELSE 'TEPAT WAKTU'
          END
        WHEN cuti_izin.id_cuti_izin IS NOT NULL AND cuti_izin.status = 'DISETUJUI' THEN 'CUTI/IZIN'
        ELSE 'TIDAK ABSEN'
      END AS status_kehadiran
    FROM jadwal_shift
    LEFT JOIN absensi ON
      absensi.id_karyawan = jadwal_shift.id_karyawan
      AND absensi.tanggal = STR_TO_DATE(
        CONCAT(
          jadwal_shift.tahun, '-',
          LPAD(jadwal_shift.bulan, 2, '0'), '-',
          LPAD(jadwal_shift.tanggal, 2, '0')
        ), '%Y-%m-%d'
      )
    LEFT JOIN cuti_izin ON
      cuti_izin.id_karyawan = jadwal_shift.id_karyawan
      AND STR_TO_DATE(
        CONCAT(
          jadwal_shift.tahun, '-',
          LPAD(jadwal_shift.bulan, 2, '0'), '-',
          LPAD(jadwal_shift.tanggal, 2, '0')
        ), '%Y-%m-%d'
      ) BETWEEN cuti_izin.tanggal_mulai AND cuti_izin.tanggal_selesai
      AND cuti_izin.status = 'DISETUJUI'
      AND cuti_izin.is_deleted = 0
    LEFT JOIN shift ON shift.id_shift = jadwal_shift.id_shift
    WHERE jadwal_shift.id_karyawan = :id_karyawan
      AND jadwal_shift.bulan = :bulan
      AND jadwal_shift.tahun = :tahun
      AND jadwal_shift.is_deleted = 0
    ORDER BY jadwal_shift.tanggal ASC;
  `;

    const results = await sequelize.query(query, {
      replacements: { id_karyawan, bulan, tahun },
      type: QueryTypes.SELECT,
    });

    return results.map((row) => {
      const tanggal = `${row.tahun}-${String(row.bulan).padStart(
        2,
        "0"
      )}-${String(row.tanggal).padStart(2, "0")}`;

      let status = "";
      switch (row.status_kehadiran) {
        case "TEPAT WAKTU":
          status = "Hadir";
          break;
        case "TELAT":
          status = "Telat";
          break;
        case "CUTI/IZIN":
          status = row.jenis === "Izin" ? "Izin" : "Cuti";
          break;
        case "TIDAK ABSEN":
          status = "Alpha";
          break;
        default:
          status = "Unknown";
      }

      return { tanggal, status };
    });
  },
};

export default Absensi;
