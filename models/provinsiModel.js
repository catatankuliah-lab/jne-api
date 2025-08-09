import sequelize from "../config/config.js";
import { QueryTypes } from "sequelize";

const Provinsi = {
  getAllProvinsi: async () => {
    const [results] = await sequelize.query(
      "SELECT * FROM provinsi ORDER BY nama_provinsi ASC"
    );
    return results;
  },

  getProvinsiByIdKantor: async (id_kantor) => {
    const results = await sequelize.query(
      `
        SELECT DISTINCT p.kode_provinsi, p.nama_provinsi
        FROM wilayah_kerja w
        JOIN kabupaten_kota kk ON w.kode_kabupaten_kota = kk.kode_kabupaten_kota
        JOIN provinsi p ON kk.kode_provinsi = p.kode_provinsi
        WHERE w.id_kantor = :id_kantor
        ORDER BY p.nama_provinsi ASC
      `,
      {
        replacements: { id_kantor },
        type: QueryTypes.SELECT,
      }
    );
    return results;
  }
};

export default Provinsi;
