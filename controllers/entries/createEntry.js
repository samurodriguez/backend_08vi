const getDB = require("../../database/getDB");
const createEntrySchema = require("../../schemas/createEntrySchema");

const createEntry = async (req, res) => {
  let connection;

  try {
    connection = await getDB();

    const { place, description } = req.body;

    await createEntrySchema.validateAsync(req.body);

    const [{ insertId }] = await connection.query(
      "INSERT INTO entries (date, place, description, user_id) VALUES (?, ?, ?, ?)",
      [new Date(), place, description, req.auth.id]
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
