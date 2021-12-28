const express = require("express");
const app = express();
const entriesController = require("./controllers/entries/index");

app.use(express.json());

app.get("/entries", entriesController.getEntries);

app.post("/entries", entriesController.createEntry);

app.get("/entries/:entryId", entriesController.getEntryById);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
