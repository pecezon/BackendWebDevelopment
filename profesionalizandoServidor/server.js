const express = require("express");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("inicio", { usuario: "invitado" });
});

app.use((req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  fs.appendFile("server.log", log, (err) => {
    if (err) {
      console.error("Error writing to log file", err);
    }
  });

  next();
});

app.get("/perfil/:id", (req, res) => {
  const usuario = undefined;
  res.render("perfil", { nombre: usuario.nombre });
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
