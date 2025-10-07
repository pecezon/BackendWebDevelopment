const express = require("express");
const app = express();
const PORT = 3000;

class Cazador {
  constructor({ name, rango, estiloDeRespiracion }) {
    this.name = name || "SinNombre";
    this.rango = rango || "SinRango";
    this.estiloDeRespiracion = estiloDeRespiracion || "SinEstilo";
    this.misionesCompletadas = 0;
  }

  presentarse() {
    console.log(
      `Soy ${this.name}! Respiracion de ${this.estiloDeRespiracion}!`
    );
  }

  completarMision() {
    this.misionesCompletadas += 1;
    console.log(
      `${this.name} completo una mision. Total: ${this.misionesCompletadas}`
    );
  }
}

const cazadores = [];

app.use(express.json());

app.post("/ingresar", (req, res) => {
  const { name, rango, estiloDeRespiracion } = req.body;
  if (!name || !rango || !estiloDeRespiracion)
    return res.status(400).send("faltan datos");
  const nuevo = new Cazador({ name, rango, estiloDeRespiracion });
  nuevo.presentarse();
  cazadores.push(nuevo);
  res.redirect("/cazadores");
});

app.get("/cazadores", (req, res) => {
  const lista = cazadores.map((c) => ({
    name: c.name,
    rango: c.rango,
    estiloDeRespiracion: c.estiloDeRespiracion,
    misionesCompletadas: c.misionesCompletadas,
  }));
  res.json(lista);
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
