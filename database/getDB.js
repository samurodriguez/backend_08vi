const mysql = require("mysql2/promise");

let pool;

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const getDB = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        connectionLimit: 10,
      });
    }

    return await pool.getConnection();
  } catch (err) {
    console.log(err);
  }
};

module.exports = getDB;
