import sequelize from "../config/config.js";

const Armada = {
  // Get all Armada
  getAllArmada: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        id_armada,
        id_jenis_kendaraan,
        nopol_armada,
        lokasi_terakhir,
        status_armada
      FROM armada
    `);
    return results;
  },

  // Get Armada by ID
  getArmadaById: async (id_armada) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_armada,
        id_jenis_kendaraan,
        nopol_armada,
        lokasi_terakhir,
        status_armada
      FROM armada
      WHERE id_armada = ?
    `,
      { replacements: [id_armada] }
    );
    return results[0];
  },

  // Get Armada by Jenis Kendaraan ID
  getArmadaByJenisKendaraan: async (id_jenis_kendaraan) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_armada,
        id_jenis_kendaraan,
        nopol_armada,
        lokasi_terakhir,
        status_armada
      FROM armada
      WHERE id_jenis_kendaraan = ?
    `,
      { replacements: [id_jenis_kendaraan] }
    );
    return results;
  },

  // Get Armada by Nopol
  getArmadaByNopol: async (nopol_armada) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        id_armada,
        id_jenis_kendaraan,
        nopol_armada,
        lokasi_terakhir,
        status_armada
      FROM armada
      WHERE nopol_armada = ?
    `,
      { replacements: [nopol_armada] }
    );
    return results;
  },

  // Add a new Armada
  addArmada: async (armadaData) => {
    const { id_jenis_kendaraan, nopol_armada, lokasi_terakhir, status_armada } = armadaData;
    const [result] = await sequelize.query(
      `
      INSERT INTO armada (id_jenis_kendaraan, nopol_armada, lokasi_terakhir, status_armada)
      VALUES (?, ?, ?, ?)
    `,
      {
        replacements: [id_jenis_kendaraan, nopol_armada, lokasi_terakhir, status_armada],
      }
    );
    return { id_armada: result.insertId, ...armadaData };
  },

  // Update Armada
  updateArmada: async (id_armada, armadaData) => {
    const { id_jenis_kendaraan, nopol_armada, lokasi_terakhir, status_armada } = armadaData;
    const [result] = await sequelize.query(
      `
      UPDATE armada
      SET id_jenis_kendaraan = ?, nopol_armada = ?, lokasi_terakhir = ?, status_armada = ?
      WHERE id_armada = ?
    `,
      {
        replacements: [id_jenis_kendaraan, nopol_armada, lokasi_terakhir, status_armada, id_armada],
      }
    );
    return result.affectedRows > 0;
  },

  // Delete Armada
  deleteArmada: async (id_armada) => {
    const [result] = await sequelize.query(
      `DELETE FROM armada WHERE id_armada = ?`,
      { replacements: [id_armada] }
    );
    return result.affectedRows > 0;
  },
};

export default Armada;
