const getDB = require("../../database/getDB");

const getEntries = async (req, res) => {
  let connection;

  try {
    connection = await getDB();

    const [entries] = await connection.query("SELECT * FROM entries");

    console.log(req.auth);

    res.send({ status: "ok", data: entries });
  } catch (err) {
    res.send({ status: "error", message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getEntries;
