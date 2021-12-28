const getDB = require("../../database/getDB");

const createEntry = async (req, res) => {
  let connection;

  try {
    connection = await getDB();

    const { titulo, descripcion } = req.body;

    const [{ insertId }] = await connection.query(
      "INSERT INTO entries (date, place, description, user_id) VALUES (?, ?, ?, ?)",
      [new Date(), titulo, descripcion, 8]
    );

    res.send({
      status: "ok",
      message: `Entrada creada con el id: ${insertId}`,
    });
  } catch (err) {
    res.send({ status: "error", message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createEntry;
