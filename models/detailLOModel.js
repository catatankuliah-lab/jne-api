import sequelize from "../config/config.js";

const DetailLO = {

    getAllDetailLOByIdLO: async (id_lo) => {
        const query = `
            SELECT detail_lo.*, detail_wo.*, desa_kelurahan.nama_desa_kelurahan, kecamatan.nama_kecamatan, kabupaten_kota.nama_kabupaten_kota, provinsi.nama_provinsi
            FROM detail_lo
            JOIN detail_wo ON detail_lo.id_detail_wo = detail_wo.id_detail_wo
            LEFT JOIN desa_kelurahan ON detail_wo.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan
            LEFT JOIN kecamatan ON detail_wo.kode_kecamatan = kecamatan.kode_kecamatan
            LEFT JOIN kabupaten_kota ON detail_wo.kode_kabupaten_kota = kabupaten_kota.kode_kabupaten_kota
            LEFT JOIN provinsi ON detail_wo.kode_provinsi = provinsi.kode_provinsi
            WHERE detail_lo.id_lo = ?
        `;

        const result = await sequelize.query(query, {
            replacements: [id_lo],
            type: sequelize.QueryTypes.SELECT,
        });

        return result;
    },

    getAllDetailLO: async () => {
        const query = `
            SELECT
            gudang.nama_gudang,
            kantor.nama_kantor,
            lo.tanggal_lo,
            lo.nomor_lo,
            lo.nopol,
            lo.driver,
            wo.nomor_wo,
            lo.nomor_do,
            lo.nomor_sjt_bulog,
            provinsi.nama_provinsi,
            kabupaten_kota.nama_kabupaten_kota,
            kecamatan.nama_kecamatan,
            desa_kelurahan.nama_desa_kelurahan,
            detail_wo.kode_desa_kelurahan,
            detail_wo.jumlah_pbp,
            detail_wo.jumlah_quantum,
            detail_lo.jumlah_pbp_salur,
            detail_lo.id_detail_lo,
            detail_lo.path_detail_lo,
            detail_lo.path_detail_lo_dokumen,
            alokasi.nama_alokasi
            FROM detail_lo
            JOIN lo ON lo.id_lo = detail_lo.id_lo
            JOIN detail_wo ON detail_lo.id_detail_wo = detail_wo.id_detail_wo
            JOIN wo ON wo.id_wo = detail_wo.id_wo
            JOIN kantor ON kantor.id_kantor = wo.id_kantor
            JOIN gudang ON gudang.id_gudang = wo.id_gudang
            JOIN alokasi ON alokasi.id_alokasi = lo.id_alokasi
            LEFT JOIN desa_kelurahan ON detail_wo.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan
            LEFT JOIN kecamatan ON detail_wo.kode_kecamatan = kecamatan.kode_kecamatan
            LEFT JOIN kabupaten_kota ON detail_wo.kode_kabupaten_kota = kabupaten_kota.kode_kabupaten_kota
            LEFT JOIN provinsi ON detail_wo.kode_provinsi = provinsi.kode_provinsi
        `;

        const result = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });

        return result;
    },

    getAllDetailLOByIdKantor: async (id_kantor) => {
        const query = `
            SELECT
            detail_lo.id_detail_lo,
            detail_lo.path_detail_lo,
            detail_lo.path_detail_lo_dokumen,
            gudang.nama_gudang,
            kantor.nama_kantor,
            lo.tanggal_lo,
            lo.nomor_lo,
            lo.nopol,
            lo.driver,
            wo.id_wo,
            wo.nomor_wo,
            lo.nomor_do,
            lo.nomor_sjt_bulog,
            provinsi.nama_provinsi,
            kabupaten_kota.nama_kabupaten_kota,
            kecamatan.nama_kecamatan,
            desa_kelurahan.nama_desa_kelurahan,
            detail_wo.kode_desa_kelurahan,
            detail_wo.jumlah_pbp,
            detail_wo.jumlah_quantum,
            detail_lo.jumlah_pbp_salur,
            alokasi.nama_alokasi
            FROM detail_lo
            JOIN lo ON lo.id_lo = detail_lo.id_lo
            JOIN detail_wo ON detail_lo.id_detail_wo = detail_wo.id_detail_wo
            JOIN wo ON wo.id_wo = detail_wo.id_wo
            JOIN kantor ON kantor.id_kantor = wo.id_kantor
            JOIN gudang ON gudang.id_gudang = wo.id_gudang
            JOIN alokasi ON alokasi.id_alokasi = lo.id_alokasi
            LEFT JOIN desa_kelurahan ON detail_wo.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan
            LEFT JOIN kecamatan ON detail_wo.kode_kecamatan = kecamatan.kode_kecamatan
            LEFT JOIN kabupaten_kota ON detail_wo.kode_kabupaten_kota = kabupaten_kota.kode_kabupaten_kota
            LEFT JOIN provinsi ON detail_wo.kode_provinsi = provinsi.kode_provinsi
            WHERE wo.id_kantor = ?
        `;

        const result = await sequelize.query(query, {
            replacements: [id_kantor],
            type: sequelize.QueryTypes.SELECT,
        });

        return result;
    },
    
    getAllDetailLOByIdGudang: async (id_gudang) => {
        const query = `
            SELECT
            detail_lo.id_detail_lo,
            detail_lo.path_detail_lo,
            detail_lo.path_detail_lo_dokumen,
            gudang.nama_gudang,
            kantor.nama_kantor,
            lo.tanggal_lo,
            lo.nomor_lo,
            lo.nopol,
            lo.driver,
            wo.id_wo,
            wo.nomor_wo,
            lo.nomor_do,
            lo.nomor_sjt_bulog,
            provinsi.nama_provinsi,
            kabupaten_kota.nama_kabupaten_kota,
            kecamatan.nama_kecamatan,
            desa_kelurahan.nama_desa_kelurahan,
            detail_wo.kode_desa_kelurahan,
            detail_wo.jumlah_pbp,
            detail_wo.jumlah_quantum,
            detail_lo.jumlah_pbp_salur,
            alokasi.nama_alokasi
            FROM detail_lo
            JOIN lo ON lo.id_lo = detail_lo.id_lo
            JOIN detail_wo ON detail_lo.id_detail_wo = detail_wo.id_detail_wo
            JOIN wo ON wo.id_wo = detail_wo.id_wo
            JOIN kantor ON kantor.id_kantor = wo.id_kantor
            JOIN gudang ON gudang.id_gudang = wo.id_gudang
            JOIN alokasi ON alokasi.id_alokasi = lo.id_alokasi
            LEFT JOIN desa_kelurahan ON detail_wo.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan
            LEFT JOIN kecamatan ON detail_wo.kode_kecamatan = kecamatan.kode_kecamatan
            LEFT JOIN kabupaten_kota ON detail_wo.kode_kabupaten_kota = kabupaten_kota.kode_kabupaten_kota
            LEFT JOIN provinsi ON detail_wo.kode_provinsi = provinsi.kode_provinsi
            WHERE wo.id_gudang = ?
        `;

        const result = await sequelize.query(query, {
            replacements: [id_gudang],
            type: sequelize.QueryTypes.SELECT,
        });

        return result;
    },

    // Cek apakah data dengan id_lo dan id_detail_wo sudah ada
    checkExists: async (id_lo, id_detail_wo) => {
        const query = `
        SELECT COUNT(*) AS count
        FROM detail_lo
        WHERE id_lo = ? AND id_detail_wo = ?
        `;
        const [[result]] = await sequelize.query(query, {
        replacements: [id_lo, id_detail_wo],
        });
        return result.count > 0;
    },

    // Ambil data detail LO berdasarkan id_lo dan id_detail_wo
    getDetailLOByIdLOAndDetailWO: async (id_lo, id_detail_wo) => {
        const query = `
        SELECT * FROM detail_lo
        WHERE id_lo = ? AND id_detail_wo = ?
        LIMIT 1
        `;
        const [[result]] = await sequelize.query(query, {
        replacements: [id_lo, id_detail_wo],
        });
        return result;
    },

    // Update data detail LO berdasarkan id_detail_lo
    updateDetailLO: async (id_detail_lo, data) => {
        const fields = Object.keys(data);
        const values = Object.values(data);

        const setClause = fields.map(field => `${field} = ?`).join(', ');
        const query = `
        UPDATE detail_lo
        SET ${setClause}
        WHERE id_detail_lo = ?
        `;

        await sequelize.query(query, {
        replacements: [...values, id_detail_lo],
        });
    },

    // Insert data baru ke detail_lo
    createDetailLO: async (data) => {
        const fields = Object.keys(data);
        const values = Object.values(data);

        const placeholders = fields.map(() => '?').join(', ');
        const fieldList = fields.join(', ');

        const query = `
        INSERT INTO detail_lo (${fieldList})
        VALUES (${placeholders})
        `;

        await sequelize.query(query, { replacements: values });

        const [[result]] = await sequelize.query("SELECT LAST_INSERT_ID() AS id_detail_lo");
        return result.id_detail_lo;
    },

    // Hapus data berdasarkan id_detail_lo
    deleteDetailLO: async (id_detail_lo) => {
        const query = `DELETE FROM detail_lo WHERE id_detail_lo = ?`;
        await sequelize.query(query, {
        replacements: [id_detail_lo],
        });
    },

    updatePathFotoDetailLO: async (id_detail_lo, path_detail_lo) => {
        const query = `
            UPDATE detail_lo 
            SET path_detail_lo = ?
            WHERE id_detail_lo = ?
        `;
        await sequelize.query(query, {
            replacements: [path_detail_lo, id_detail_lo],
        });
    }
    
};

export default DetailLO;