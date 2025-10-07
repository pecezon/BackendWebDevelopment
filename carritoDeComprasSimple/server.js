const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

const productos = [
  { id: 1, nombre: "Pocion de Vida" },
  { id: 2, nombre: "Espada Maestra" },
  { id: 3, nombre: "Escudo de Hierro" },
  { id: 4, nombre: "Arco Elfico" },
];

app.use(express.json());
app.use(cors());

app.get("/productos", (req, res) => {
  res.json(productos);
});

app.post("/comprar", (req, res) => {
  const { ids } = req.body;
  console.log("Compra recibida con los productos:", ids);
  res.json({ mensaje: "Compra procesada correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
