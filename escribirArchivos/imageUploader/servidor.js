const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use(express.json());

app.post("/subir-perfil", upload.single("image"), (req, res) => {
  fs.rename(req.file.path, `uploads/perfil-de-usuario.jpg`, (err) => {
    if (err) {
      return res.status(500).send("Error al guardar la imagen");
    }
    res.send("Imagen subida exitosamente");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
