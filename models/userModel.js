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

  // Ambil PIC
  getPIC: async () => {
    const result = await sequelize.query(
      `SELECT * FROM user WHERE id_role = 3`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return result;
  },
};

export default User;