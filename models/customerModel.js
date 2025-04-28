import sequelize from "../config/config.js";

const Customer = {
  // Mendapatkan semua customer
  getAllCustomers: async (page = 1, per_page = 10, filters = {}) => {
    try {
      const offset = (page - 1) * per_page;
      let whereClause = "WHERE 1=1";
      let replacements = { per_page: parseInt(per_page), offset: parseInt(offset) };

      if (filters.nama_customer) {
        whereClause += " AND customer.nama_customer LIKE :nama_customer";
        replacements.nama_customer = `%${filters.nama_customer}%`;
      }

      if (filters.alamat_customer) {
        whereClause += " AND customer.alamat_customer LIKE :alamat_customer";
        replacements.alamat_customer = `%${filters.alamat_customer}%`;
      }
      
      if (filters.startDate && filters.endDate) {
        whereClause += " AND po.tanggal_po BETWEEN :startDate AND :endDate";
        replacements.startDate = filters.startDate;
        replacements.endDate = filters.endDate;
      } else if (filters.startDate) {
        whereClause += " AND po.tanggal_po >= :startDate";
        replacements.startDate = filters.startDate;
      } else if (filters.endDate) {
        whereClause += " AND po.tanggal_po <= :endDate";
        replacements.endDate = filters.endDate;
      }

      const query = `
      SELECT 
        customer.id_customer,
        customer.nama_customer, 
        customer.alamat_customer,
        MIN(po.tanggal_po) AS tanggal_po,
        COUNT(po.id_po) AS total_po
      FROM customer
      LEFT JOIN po ON customer.id_customer = po.id_customer
      ${whereClause}
      GROUP BY customer.id_customer, 
      customer.nama_customer, 
      customer.alamat_customer, 
      LIMIT :per_page OFFSET :offset;
    `;

      const data = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
      });

      const countQuery = `
      SELECT COUNT(*) AS total FROM customer
              LEFT JOIN
          po ON customer.id_customer = po.id_customer
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
    } catch (error) {
      throw new Error("Error fetching paginated data: " + error.message);
    }
    
  },

  getSelectOptionCustomers: async () => {
    const [results] = await sequelize.query(`
      SELECT
        customer.*
      FROM customer
    `);
    return results;
  },

  getCustomerById: async (id_customer) => {
    const [results] = await sequelize.query(
      `
      SELECT * FROM customer
      WHERE id_customer = ?
      `,
      {
        replacements: [id_customer],
      }
    );
    return results[0];
  },

  addCustomer: async (
    nama_customer,
    alamat_customer,
    penanggung_jawab_customer,
    nomor_penanggung_jawab_customer,
    jumlah_order
  ) => {
    const result = await sequelize.query(
      `
      INSERT INTO customer (
        nama_customer, alamat_customer, penanggung_jawab_customer, nomor_penanggung_jawab_customer, jumlah_order
      ) VALUES (?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          nama_customer,
          alamat_customer,
          penanggung_jawab_customer,
          nomor_penanggung_jawab_customer,
          jumlah_order
        ],
      }
    );
    return result[0];
  },

  updateCustomer: async (id_customer, customerData) => {
    const { nama_customer, alamat_customer, penanggung_jawab_customer, nomor_penanggung_jawab_customer, jumlah_order } = customerData;
    const [result] = await sequelize.query(
      `
      UPDATE customer
      SET 
        nama_customer = ?,
        alamat_customer = ?,
        penanggung_jawab_customer = ?,
        nomor_penanggung_jawab_customer = ?,
        jumlah_order = ?
      WHERE 
        id_customer = ?
    `,
      {
        replacements: [
          nama_customer,
          alamat_customer,
          penanggung_jawab_customer,
          nomor_penanggung_jawab_customer,
          jumlah_order,
          id_customer
        ],
      }
    );
    return result.affectedRows > 0;
  },
};

export default Customer;