const bcrypt = require("bcrypt");

const getDB = require("../../database/getDB");

const register = async (req, res) => {
  let connection;

  try {
    connection = await getDB();

    const { email, password } = req.body;

    const [users] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length > 0) {
      throw new Error("Ya existe un usuario con ese email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [{ insertId }] = await connection.query(
      "INSERT INTO users (email, password, date) VALUES (?, ?, ?)",
      [email, hashedPassword, new Date()]
    );

    res.send({
      status: "ok",
      message: `Usuario con el id ${insertId} creado correctamente`,
    });
  } catch (err) {
    res.send({ status: "error", message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = register;
