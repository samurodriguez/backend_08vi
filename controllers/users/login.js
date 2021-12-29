const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getDB = require("../../database/getDB");

const login = async (req, res) => {
  let connection;

  try {
    connection = await getDB();

    const { email, password } = req.body;

    const [users] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length < 1) {
      throw new Error("No existe ningún usuario con ese email");
    }

    const dbUser = users[0];

    const isPasswordOk = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordOk) {
      throw new Error("La contraseña es incorrecta");
    }

    const tokenInfo = {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
    };

    const { JWT_SECRET } = process.env;

    const token = jwt.sign(tokenInfo, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.send({ status: "ok", token });
  } catch (err) {
    res.send({ status: "error", message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = login;
