const express = require("express");
const app = express();
const fs = require("fs");

require("dotenv").config();
app.set("view engine", "ejs");

let proyectos = [
  {
    id: 1,
    titulo: "Proyecto A",
    descripcion: "Descripción del Proyecto A",
    tecnologia: "Node.js",
    link: "http://proyecto-a.com",
    author: process.env.AUTHOR,
  },
  {
    id: 2,
    titulo: "Proyecto B",
    descripcion: "Descripción del Proyecto B",
    tecnologia: "Express",
    link: "http://proyecto-b.com",
    author: process.env.AUTHOR,
  },
  {
    id: 3,
    titulo: "Proyecto C",
    descripcion: "Descripción del Proyecto C",
    tecnologia: "MongoDB",
    link: "http://proyecto-c.com",
    author: process.env.AUTHOR,
  },
];

app.get("/portafolio", (req, res) => {
  res.render("portafolioDinamico", { proyectos });
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
