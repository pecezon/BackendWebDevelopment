const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al consultar la API: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    return { error: err.message };
  }
}

app.post("/obtener-api", async (req, res) => {
  const { apiUrl } = req.body;
  if (!apiUrl) {
    return res.status(400).json({ error: "Falta el parametro de la url" });
  }
  const data = await fetchData(apiUrl);
  res.json({ data });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
