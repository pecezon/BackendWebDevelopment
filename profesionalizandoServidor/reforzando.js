const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const cazadores = [
  { nombre: "Tanjiro Kamado", respiracion: "Agua" },
  { nombre: "Inosuke Hashibira", respiracion: "Bestia" },
];

app.use((req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  fs.appendFile("reforzando.log", log, (err) => {
    if (err) {
      console.error("Error writing to log file", err);
    }
  });

  next();
});

app.get("/", (req, res) => {
  res.render("cazadores", { cazadores });
});

app.post("/registrar", (req, res) => {
  const nuevoCazador = {
    nombre: req.body.nombre,
    respiracion: req.body.respiracion,
  };

  if (cazadores.find((c) => c.nombre === nuevoCazador.nombre)) {
    res.send("Error: ¡Un cazador con ese nombre ya existe!");
  } else {
    cazadores.push(nuevoCazador);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Servidor de la Sede escuchando en http://localhost:${port}`);
});
