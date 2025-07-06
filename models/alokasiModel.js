import sequelize from "../config/config.js";

const Alokasi = {
    // Get all Alokasi
    getAllAlokasi: async () => {
        const [results] = await sequelize.query("SELECT * FROM alokasi");
        return results;
    },
}

export default Alokasi;