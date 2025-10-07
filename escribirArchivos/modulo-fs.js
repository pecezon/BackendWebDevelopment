const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const fs = require("fs");

app.get("/crear-log", (req, res) => {
  const fecha = new Date().toLocaleString();
  fs.writeFile("log.txt", `Log creado en ${fecha}\n`, (err) => {
    if (err) {
      return res.status(500).send("Error al crear el log");
    }
    res.send("Log creado exitosamente");
  });
});

app.get("/leer-log", (req, res) => {
  fs.readFile("log.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer el log");
    }
    res.type("text/plain").send(data);
  });
});

const { exec } = require("child_process");
app.get("/info-cpu", (req, res) => {
  exec("uname -a", (error, stdout, stderr) => {
    if (error) {
      return res
        .status(500)
        .send(`Error al obtener info de CPU: ${error.message}`);
    }
    res.type("text/plain").send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
