import sequelize from "../config/config.js";

const User = {
  // ADD USER 
  addUser: async (userData) => {

    const keys = Object.keys(userData);
    const values = Object.values(userData);

    const fields = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');

    const query = `
      INSERT INTO user (${fields})
      VALUES (${placeholders})
    `;

    const result = await sequelize.query(query, {
      replacements: values,
    });

    return result[0];
  },

  // Ambil All PIC
  getAllPIC: async () => {
    const result = await sequelize.query(
      `
      SELECT user.*, gudang.nama_gudang, kantor.nama_kantor
      FROM user
      JOIN gudang ON user.id_gudang = gudang.id_gudang
      JOIN kantor ON user.id_kantor = kantor.id_kantor
      WHERE id_role = 3
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },

  // Ambil All PIC Kantor
  getAllPICKantor: async (id_kantor) => {
    const result = await sequelize.query(
      `
      SELECT user.*, gudang.nama_gudang, kantor.nama_kantor
      FROM user
      JOIN gudang ON user.id_gudang = gudang.id_gudang
      JOIN kantor ON user.id_kantor = kantor.id_kantor
      WHERE id_role = 3 AND user.id_kantor = ?
      `,
      {
        replacements: [id_kantor],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },

  // Ambil All Checker
  getAllChecker: async () => {
    const result = await sequelize.query(
      `
      SELECT user.*, gudang.nama_gudang, kantor.nama_kantor
      FROM user
      JOIN gudang ON user.id_gudang = gudang.id_gudang
      JOIN kantor ON user.id_kantor = kantor.id_kantor
      WHERE id_role = 4
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },

  // Ambil All Checker Gudang
  getAllCheckerGudang: async (id_gudang) => {
    const result = await sequelize.query(
      `
      SELECT user.*, gudang.nama_gudang, kantor.nama_kantor
      FROM user
      JOIN gudang ON user.id_gudang = gudang.id_gudang
      JOIN kantor ON user.id_kantor = kantor.id_kantor
      WHERE id_role = 4 AND user.id_gudang = ?
      `,
      {
        replacements: [id_gudang],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },

};

export default User;