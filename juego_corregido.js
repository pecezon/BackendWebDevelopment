let puntuacionTotal = 100; // ahora con let
let bonoActivo = true;
let puntosConBonus = 0; //Declaramos la variable afuera oara poder usarla

function agregarPuntosPorNivel(puntos) {
  puntuacionTotal = puntuacionTotal + puntos;
  console.log(`Puntuación después del nivel: ${puntuacionTotal}`);
  return puntuacionTotal; // devolvemos la nueva puntuación
}

function aplicarBono() {
  if (bonoActivo) {
    puntosConBonus = puntuacionTotal * 1.25;
    console.log(`Bono aplicado. Puntuación con bonus: ${puntosConBonus}`);
  } else {
    console.log("No hay bono activo.");
    puntosConBonus = puntuacionTotal; // sin bonus queda igual
  }
  return puntosConBonus;
}

agregarPuntosPorNivel(50);
aplicarBono();
let puntuacionFinal = puntosConBonus;
console.log(`La puntuación final del jugador es: ${puntuacionFinal}`);
