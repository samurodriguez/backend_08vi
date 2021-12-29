require("dotenv").config();
const express = require("express");
const app = express();
const entriesController = require("./controllers/entries/index");
const usersController = require("./controllers/users/index");

const { SERVER_PORT, SERVER_HOST } = process.env;

app.use(express.json());

// Entries
app.get("/entries", entriesController.getEntries);
app.post("/entries", entriesController.createEntry);
app.get("/entries/:entryId", entriesController.getEntryById);

// Users
app.post("/register", usersController.register);
app.post("/login", usersController.login);

app.listen(SERVER_PORT, () => {
  console.log(`Servidor iniciado en http://${SERVER_HOST}:${SERVER_PORT}`);
});
