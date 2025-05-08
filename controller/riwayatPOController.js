import RiwayatPO from "../models/riwayatPOModel.js"; // Ensure the model is created
import multer from "multer";
import path from "path";
import fs from "fs";
const upload = multer();

export const getRiwayatPO = async (req, res) => {
  try {
    const riwayatPO = await RiwayatPO.getRiwayatPO();
    res.status(200).json({
      status: "success",
      data: riwayatPO,
      message: "Riwayat PO records fetched successfully."
    });
  } catch (error) {
    console.error("Error fetching Riwayat PO records:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
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
  const { id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar, shareloc, nama_penerima, nomor_penerima } = req.body;

  try {
    const riwayatPO = await RiwayatPO.addRiwayatPO(id_po, id_kabupaten_kota, alamat_titik_bongkar, jam_bongkar, shareloc, nama_penerima, nomor_penerima);
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
