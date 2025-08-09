import sequelize from "../config/config.js";

const User = {
  // ADD USER
  addUser: async (userData, options = {}) => {
    const keys = Object.keys(userData);
    const values = Object.values(userData);

    const fields = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");

    const query = `
    INSERT INTO users (${fields})
    VALUES (${placeholders})
  `;

    const result = await sequelize.query(query, {
      replacements: values,
      type: sequelize.QueryTypes.INSERT,
      ...options,
    });

    const insertedId = result[0];
    return { id_user: insertedId };
  },

  updateUser: async (id_user, userData, options = {}) => {
    const keys = Object.keys(userData);
    const values = Object.values(userData);

    if (keys.length === 0) {
      console.warn("Tidak ada field yang dikirim untuk update user.");
      return [0];
    }

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    values.push(id_user);

    const query = `
    UPDATE users
    SET ${setClause}
    WHERE id_user = ?
  `;

    const result = await sequelize.query(query, {
      replacements: values,
      type: sequelize.QueryTypes.UPDATE,
      ...options,
    });

    return result;
  },
};

export default User;
