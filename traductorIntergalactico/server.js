const fetch = require("node-fetch");
const fs = require("fs").promises;

async function traducirYGuardar(texto) {
  try {
    const respuesta = await fetch(
      "https://api.funtranslations.com/translate/yoda.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: texto }),
      }
    );

    const datos = await respuesta.json();

    const textoTraducido = datos.contents.translated;

    await fs.writeFile("traduccion_yoda.txt", textoTraducido);

    console.log("Traduccion guardada en traduccion_yoda.txt");
  } catch (error) {
    console.error("Error durante la traduccion:", error);
  }
}

traducirYGuardar("You will learn asynchronous programming today.");
