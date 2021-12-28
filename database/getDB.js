const mysql = require("mysql2/promise");

let pool;

const getDB = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        host: "localhost",
        user: "samudb",
        password: "Inazuma1234@",
        database: "diario_viajes",
        connectionLimit: 10,
      });
    }

    return await pool.getConnection();
  } catch (err) {
    console.log(err);
  }
};

module.exports = getDB;
