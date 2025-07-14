import sequelize from "../config/config.js";
import { createAbsensi } from "../controller/absensiController.js";

const AbsensiUser = {

    // Update data detail LO berdasarkan id_detail_lo
    // updateDetailLO: async (id_detail_lo, data) => {
    //     const fields = Object.keys(data);
    //     const values = Object.values(data);

    //     const setClause = fields.map(field => `${field} = ?`).join(', ');
    //     const query = `
    //     UPDATE detail_lo
    //     SET ${setClause}
    //     WHERE id_detail_lo = ?
    //     `;

    //     await sequelize.query(query, {
    //     replacements: [...values, id_detail_lo],
    //     });
    // },

    // Insert data baru ke absensi
    createAbsensi: async (data) => {
        const fields = Object.keys(data);
        const values = Object.values(data);

        const placeholders = fields.map(() => '?').join(', ');
        const fieldList = fields.join(', ');

        const query = `
        INSERT INTO absensi (${fieldList})
        VALUES (${placeholders})
        `;

        const [result] = await sequelize.query(query, { replacements: values });
        return result;
    },

    // updatePathFotoDetailLO: async (id_detail_lo, path_detail_lo) => {
    //     const query = `
    //         UPDATE detail_lo 
    //         SET path_detail_lo = ?
    //         WHERE id_detail_lo = ?
    //     `;
    //     await sequelize.query(query, {
    //         replacements: [path_detail_lo, id_detail_lo],
    //     });
    // }
    
};

export default AbsensiUser;