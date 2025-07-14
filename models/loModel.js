import sequelize from "../config/config.js";

const Lo = {
  addLo: async (loData) => {
    const fields = Object.keys(loData);
    const values = Object.values(loData);

    const placeholders = fields.map(() => '?').join(', ');
    const fieldList = fields.join(', ');

    const query = `INSERT INTO lo (${fieldList}) VALUES (${placeholders})`;

    await sequelize.query(query, { replacements: values });
    const [[idResult]] = await sequelize.query("SELECT LAST_INSERT_ID() AS id_lo");

    return idResult.id_lo;
  },

  getAllLo: async () => {
    const result = await sequelize.query(`SELECT * FROM lo`, {
      type: sequelize.QueryTypes.SELECT,
    });
    return result;
  },

  getLoById: async (id_lo) => {
    const result = await sequelize.query(`
      SELECT lo.*, alokasi.nama_alokasi, kantor.nama_kantor, gudang.nama_gudang FROM lo
      JOIN alokasi ON alokasi.id_alokasi = lo.id_alokasi
      JOIN wo ON wo.id_wo = lo.id_wo
      JOIN kantor ON kantor.id_kantor = wo.id_kantor
      JOIN gudang ON gudang.id_gudang = wo.id_gudang
      WHERE lo.id_lo = ?
      `, {
      replacements: [id_lo],
      type: sequelize.QueryTypes.SELECT,
    });
    return result[0];
  },

    // Ambil semua LO berdasarkan id_kantor
    getLoByIdKantor: async (id_kantor) => {
    const result = await sequelize.query(
        `
        SELECT lo.* 
        FROM lo
        JOIN wo ON lo.id_wo = wo.id_wo
        WHERE wo.id_kantor = ?
        `,
        {
        replacements: [id_kantor],
        type: sequelize.QueryTypes.SELECT,
        }
    );
    return result;
    },

    // Ambil semua LO berdasarkan id_gudang
    getLoByIdGudang: async (id_gudang) => {
        const result = await sequelize.query(
            `
            SELECT lo.*, wo.id_alokasi, wo.nomor_wo, user.nama_lengkap, user.telpon_user
            FROM lo
            JOIN wo ON lo.id_wo = wo.id_wo
            JOIN user ON user.id_user = lo.id_checker
            WHERE wo.id_gudang = ? ORDER BY wo.nomor_wo ASC
            `,
            {
            replacements: [id_gudang],
            type: sequelize.QueryTypes.SELECT,
            }
        );
        return result;
    },

  updateLo: async (id_lo, loData) => {
    const keys = Object.keys(loData);
    const values = Object.values(loData);

    const updates = keys.map((key) => `${key} = ?`).join(', ');
    const query = `UPDATE lo SET ${updates} WHERE id_lo = ?`;

    return await sequelize.query(query, { replacements: [...values, id_lo] });
  },

  deleteLo: async (id_lo) => {
    return await sequelize.query(`DELETE FROM lo WHERE id_lo = ?`, {
      replacements: [id_lo],
    });
  },

  uploadMuatLO: async (id_lo, path_lo) => {
        const query = `
            UPDATE lo 
            SET path_lo = ?
            WHERE id_lo = ?
        `;
        await sequelize.query(query, {
            replacements: [path_lo, id_lo],
        });
    },

    uploadScanDokumen: async (id_lo, path_scan_lo) => {
        const query = `
            UPDATE lo 
            SET path_scan_lo = ?
            WHERE id_lo = ?
        `;
        await sequelize.query(query, {
            replacements: [path_scan_lo, id_lo],
        });
    },
    uploadScanDokumenSO: async (id_lo, path_scan_so) => {
        const query = `
            UPDATE lo 
            SET path_scan_so = ?
            WHERE id_lo = ?
        `;
        await sequelize.query(query, {
            replacements: [path_scan_so, id_lo],
        });
    }
};

export default Lo;