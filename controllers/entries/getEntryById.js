const getDB = require("../../database/getDB");

const getEntryById = async (req, res) => {
  let connection;

  try {
    connection = await getDB();

    const [[entry]] = await connection.query(
      "SELECT * FROM entries WHERE id = ?",
      [req.params.entryId]
    );

    res.send({ status: "ok", data: entry });
  } catch (err) {
    res.send({ status: "error", message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getEntryById;
