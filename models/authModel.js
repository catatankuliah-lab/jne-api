// models/authModel.js
import sequelize from "../config/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AuthModel = {
  findUserByUsername: async (username) => {
    const [user] = await sequelize.query(
      `SELECT users.*, role.*, karyawan.*, kantor.latitude, kantor.longitude, kantor.nama_kantor, departemen.nama_departemen, bagian.nama_bagian FROM
        users
      LEFT JOIN
        role ON users.id_role = role.id_role
      LEFT JOIN
        karyawan ON karyawan.id_user = users.id_user
      LEFT JOIN
        kantor ON kantor.id_kantor = karyawan.id_kantor
      LEFT JOIN
        bagian ON bagian.id_bagian = karyawan.id_bagian
      LEFT JOIN
        departemen ON departemen.id_departemen = bagian.id_departemen
      WHERE
        username = :username`,
      {
        replacements: { username },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return user;
  },

  // Bandingkan password
  comparePassword: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  },

  // Generate JWT token
  generateToken: (userId, roleId, secret) => {
    return jwt.sign({ id_user: userId, id_role: roleId }, secret, {
      expiresIn: "24h",
    });
  },
};

export default AuthModel;
