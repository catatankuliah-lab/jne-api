import sequelize from "../config/config.js";

const Provinsi = {
    // Get all provinsi
    getAllProvinsi : async (page = 1, per_page = 10, filters = {}) => {
        try {
            const offset = (page - 1) * per_page;
            let whereClause = "WHERE 1=1";
            const replacements = {
                per_page: parseInt(per_page),
                offset: parseInt(offset)
            };

            // filter: kode_provinsi
            if (filters.kode_provinsi) {
                whereClause += " AND p.kode_provinsi LIKE :kode_provinsi";
                replacements.kode_provinsi = `%${filters.kode_provinsi}%`;
            }

            // filter: nama_provinsi
            if (filters.nama_provinsi) {
                whereClause += " AND p.nama_provinsi LIKE :nama_provinsi";
                replacements.nama_provinsi = `%${filters.nama_provinsi}%`;
            }

            const query = `
            SELECT
                p.kode_provinsi,
                p.nama_provinsi
            FROM provinsi p
            ${whereClause}
            ORDER BY p.nama_provinsi ASC
            LIMIT :per_page OFFSET :offset;
            `;

            const data = await sequelize.query(query, {
                replacements,
                type: sequelize.QueryTypes.SELECT,
            });

            const countQuery = `
            SELECT COUNT(*) AS total
            FROM provinsi p
            ${whereClause};
            `;

            const [countResult] = await sequelize.query(countQuery, {
                replacements,
                type: sequelize.QueryTypes.SELECT,
            });

            return {
                data,
                total: countResult.total,
                page,
                per_page,
            };
        } catch (err) {
            throw new Error("Error fetching provinsi: " + err.message);
        }
    },
}

export default Provinsi;
