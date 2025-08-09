import Karyawan from "../models/karyawanModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sequelize from "../config/config.js";

// Tambah Karyawan
export const addKaryawan = async (req, res) => {
  const data = {
    ...req.body,
    is_deleted: 0,
  };

  const t = await sequelize.transaction(); // Mulai transaksi

  try {
    // 1. Tambah user
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const userData = {
      username: data.username,
      password: hashedPassword,
      id_role: data.id_role,
      created_by: data.created_by,
      updated_by: data.created_by,
    };

    const newUser = await User.addUser(userData, { transaction: t });

    // 2. Tambah karyawan
    const karyawanData = {
      nip: data.nip,
      nama: data.nama,
      email: data.email,
      no_hp: data.no_hp,
      alamat: data.alamat,
      id_bagian: data.id_bagian,
      id_user: newUser.id_user,
      created_by: data.created_by,
      updated_by: data.created_by,
      default_shift_id: data.default_shift_id,
      nik: data.nik,
      tempat_lahir: data.tempat_lahir,
      tanggal_lahir: data.tanggal_lahir,
      jenis_kelamin: data.jenis_kelamin,
      golongan_darah: data.golongan_darah,
      agama: data.agama,
      status_pernikahan: data.status_pernikahan,
      kode_desa_kelurahan: data.kode_desa_kelurahan,
      id_kantor : data.id_kantor,
      id_pendidikan : data.id_pendidikan,
      id_status_karyawan : data.id_status_karyawan,
      karyawan_sejak : data.karyawan_sejak,
    };

    const newKaryawan = await Karyawan.addKaryawan(karyawanData, {
      transaction: t,
    });

    // Commit transaksi jika semua sukses
    await t.commit();

    res.status(201).json({
      message: "User & Karyawan berhasil ditambahkan",
      data: {
        user: newUser,
        karyawan: newKaryawan,
      },
    });
  } catch (error) {
    // Rollback jika ada error
    await t.rollback();

    console.error("Error adding karyawan:", error);
    res.status(500).json({
      message: "Gagal menambahkan user/karyawan",
      error: error.message,
    });
  }
};

// Get Semua Karyawan
export const getAllKaryawan = async (req, res) => {
  try {
    const filters = req.body;
    const result = await Karyawan.getAllKaryawan(filters);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data karyawan",
      error: error.message,
    });
  }
};

// Get Detail Karyawan by ID
export const getKaryawanById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Karyawan.getKaryawanById(id);

    if (!result) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Gagal mengambil detail karyawan",
        error: error.message,
      });
  }
};

// Update Karyawan
export const updateKaryawan = async (req, res) => {
  const { id } = req.params; // ID karyawan
  const data = req.body;

  console.log("Data untuk update:", data);
  console.log("ID Karyawan:", id);

  const t = await sequelize.transaction(); // Mulai transaksi

  try {
    // 1. Ambil data karyawan lama untuk dapatkan id_user
    const existingKaryawan = await Karyawan.getKaryawanById(id);
    if (!existingKaryawan) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan." });
    }

    const id_user = existingKaryawan.id_user;

    // 2. Update user (jika ada perubahan username/password/role)
    const userData = {
      username: data.username,
      id_role: data.id_role,
      updated_by: data.updated_by,
    };

    if (data.password) {
      const hashedPassword = bcrypt.hashSync(data.password, 10);
      userData.password = hashedPassword;
    }

    await User.updateUser(id_user, userData, { transaction: t });

    console.log("User updated successfully:", userData);

    // 3. Update karyawan
    const karyawanData = {
      nip: data.nip,
      nama: data.nama,
      email: data.email,
      no_hp: data.no_hp,
      alamat: data.alamat,
      id_bagian: data.id_bagian,
      default_shift_id: data.default_shift_id,
      updated_by: data.updated_by,
      nik: data.nik,
      tempat_lahir: data.tempat_lahir,
      tanggal_lahir: data.tanggal_lahir,
      jenis_kelamin: data.jenis_kelamin,
      golongan_darah: data.golongan_darah,
      agama: data.agama,
      status_pernikahan: data.status_pernikahan,
      kode_desa_kelurahan: data.kode_desa_kelurahan,
      id_kantor : data.id_kantor,
      id_pendidikan : data.id_pendidikan,
      id_status_karyawan : data.id_status_karyawan,
      karyawan_sejak : data.karyawan_sejak,
    };

    const result = await Karyawan.updateKaryawan(id, karyawanData, {
      transaction: t,
    });

    if (result.affectedRows === 0 && !result[0]) {
      await t.rollback();
      return res.status(404).json({ message: "Gagal memperbarui karyawan." });
    }

    await t.commit();

    // Ambil data terbaru
    const updatedKaryawan = await Karyawan.getKaryawanById(id);

    res.status(200).json({
      message: "Karyawan & User berhasil diperbarui.",
      data: updatedKaryawan,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error saat memperbarui karyawan:", error);
    res.status(500).json({
      message: "Gagal memperbarui user/karyawan.",
      error: error.message,
    });
  }
};

// Soft Delete Karyawan
export const deleteKaryawan = async (req, res) => {
  try {
    const { id } = req.params;
    const { updated_by } = req.body; // harus dikirim dari client

    const result = await Karyawan.deleteKaryawan(id, updated_by);
    res
      .status(200)
      .json({ message: "Karyawan berhasil dihapus (soft delete)", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus karyawan", error: error.message });
  }
};
