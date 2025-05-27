import RiwayatPO from "../models/riwayatPOModel.js"; // Ensure the model is created
import multer from "multer";
import path from "path";
import fs from "fs";
const upload = multer();

export const getRiwayatPO = async (req, res) => {
  const { page = 1, limit = 10, nomor_po, nama_customer, armada, driver, startDate, endDate, status_riwayat_po } = req.query;
  try {
    const { data, total } = await RiwayatPO.getRiwayatPO(
      parseInt(page),
      parseInt(limit),
      { nomor_po, nama_customer, armada, driver, startDate, endDate, status_riwayat_po }
    );
    res.json({
      data,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      totalData: total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRiwayatPOById = async (req, res) => {
  const { id_riwayat_po } = req.params;

  try {
    const riwayatPO = await RiwayatPO.getRiwayatPOById(id_riwayat_po);
    if (riwayatPO) {
      res.status(200).json({
        status: "success",
        data: riwayatPO,
        message: "Riwayat PO fetched successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Riwayat PO not found."
      });
    }
  } catch (error) {
    console.error("Error fetching Riwayat PO by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

export const getRiwayatPOByIdPO = async (req, res) => {
  const { id_po } = req.params;

  try {
    const riwayatPO = await RiwayatPO.getRiwayatPOByIdPO(id_po);
    if (riwayatPO) {
      res.status(200).json({
        status: "success",
        data: riwayatPO,
        message: "Riwayat PO fetched successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Riwayat PO not found."
      });
    }
  } catch (error) {
    console.error("Error fetching Riwayat PO by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

export const addRiwayatPO = async (req, res) => {
  const {
    id_po,
    nomor_po,
    tanggal_po,
    jam_stanby,
    jam_muat,
    nama_customer,
    origin,
    destination,
    armada,
    driver,
    jenis_muatan,
    catatan_po,
    file_sj,
    reguler_jarak_isi,
    reguler_solar_isi,
    reguler_jarak_kosong,
    reguler_solar_kosong,
    reguler_jam_tunggu,
    reguler_solar_tunggu,
    reguler_gaji_driver,
    reguler_tonase,
    reguler_kas_jalan,
    reguler_rute,
    reguler_catatan,
    kosongan_jarak_isi,
    kosongan_solar_isi,
    kosongan_jarak_kosong,
    kosongan_solar_kosong,
    kosongan_jam_tunggu,
    kosongan_solar_tunggu,
    kosongan_gaji_driver,
    kosongan_tonase,
    kosongan_kas_jalan,
    kosongan_rute,
    kosongan_catatan,
    tarif_ac,
    tarif_ban,
    tarif_po,
    status_riwayat_po
  } = req.body;

  // ✅ Validasi: wajib isi tarif_po
  if (!tarif_po || tarif_po.trim() === "") {
    return res.status(400).json({ error: "Tarif PO wajib diisi." });
  }

  try {
    const riwayatPO = await RiwayatPO.addRiwayatPO(
      id_po,
      nomor_po,
      tanggal_po,
      jam_stanby,
      jam_muat,
      nama_customer,
      origin,
      destination,
      armada,
      driver,
      jenis_muatan,
      catatan_po,
      file_sj,
      reguler_jarak_isi,
      reguler_solar_isi,
      reguler_jarak_kosong,
      reguler_solar_kosong,
      reguler_jam_tunggu,
      reguler_solar_tunggu,
      reguler_gaji_driver,
      reguler_tonase,
      reguler_kas_jalan,
      reguler_rute,
      reguler_catatan,
      kosongan_jarak_isi,
      kosongan_solar_isi,
      kosongan_jarak_kosong,
      kosongan_solar_kosong,
      kosongan_jam_tunggu,
      kosongan_solar_tunggu,
      kosongan_gaji_driver,
      kosongan_tonase,
      kosongan_kas_jalan,
      kosongan_rute,
      kosongan_catatan,
      tarif_ac,
      tarif_ban,
      tarif_po,
      status_riwayat_po
    );
    res.status(201).json({
      status: "success",
      data: riwayatPO,
      message: "Riwayat PO created successfully."
    });
  } catch (error) {
    console.error("Error creating Riwayat PO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};


export const updateStatusRiwayatPO = async (req, res) => {
  const { id_riwayat_po } = req.params;
  const dataRiwayatPO = req.body;

  try {
    const updateRiwayatPO = await RiwayatPO.updateStatusRiwayatPO(id_riwayat_po, dataRiwayatPO);
    if (updateRiwayatPO) {
      res.status(200).json({
        status: "success",
        data: updateRiwayatPO,
        message: "Riwayat PO updated successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Riwayat PO not found."
      });
    }
  } catch (error) {
    console.error("Error updating Riwayat PO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

export const uploadRiwayatPO = async (req, res) => {
  const { id_titik_bongkar } = req.params;
  upload.single("file_titik_bongkar")(req, res, async (err) => {

    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File tidak ditemukan" });
    }

    const nomorPO = req.body.nomor_po;
    const tanggalPO = req.body.tanggal_po;
    const nomorUrut = req.body.nomor_urut;
    if (!nomorPO) {
      return res.status(400).json({ error: "Nomor PO tidak ditemukan" });
    }

    // Tentukan lokasi penyimpanan
    const uploadPath = "uploads/po/" + tanggalPO + "/" + nomorPO + "/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Tentukan nama file baru
    const newFileName = `RiwayatPO-${nomorUrut}.jpg`;
    const filePath = path.join(uploadPath, newFileName);

    // Simpan file dari buffer ke disk dengan nama yang diinginkan
    fs.writeFile(filePath, req.file.buffer, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Gagal menyimpan file" });
      }
      try {
        // Update database dengan nama file baru
        const fileFoto = uploadPath + "" + newFileName;
        const updateRiwayatPO = await RiwayatPO.uploadRiwayatPO(id_titik_bongkar, fileFoto);
        res.status(200).json({
          status: "success",
          data: updateRiwayatPO,
          message: "LO updated successfully.",
        });
      } catch (error) {
        console.error("Error updating LO:", error);
        res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
    });
  });
};
