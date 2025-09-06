const inventario = [
  { id: "p001", nombre: "Teclado Mecánico", stock: 10 },
  { id: "p002", nombre: "Mouse Gamer", stock: 5 },
  { id: "p003", nombre: 'Monitor 24"', stock: 0 },
  { id: "p004", nombre: "Audífonos Pro", stock: 8 },
];

function buscarProductoPorId(id) {
  //Buscar el producto en el array inventario
  const producto = inventario.find((item) => item.id === id);

  //Si el producto es null
  if (!producto) {
    throw new Error(`¡Error! Producto con ID '${id}' no encontrado.`);
  }
  return producto;
}

function procesarVenta(id, cantidad) {
  try {
    const producto = buscarProductoPorId(id);

    //Si hay menos stock que cantidad
    if (producto.stock < cantidad) {
      throw new Error(
        `Stock insuficiente para '${producto.nombre}'. Solo quedan ${producto.stock} unidades.`
      );
    }

    producto.stock -= cantidad;
    console.log(
      `Venta exitosa: ${cantidad} unidad(es) de ${producto.nombre}. Stock restante: ${producto.stock}`
    );
  } catch (error) {
    console.error(`No se pudo procesar la venta. Motivo: ${error.message}`);
  }
}

console.log("--- Intentando procesar ventas ---");
procesarVenta("p002", 3);
procesarVenta("p999", 1);
procesarVenta("p001", 15);
procesarVenta("p003", 1);

console.log("\n--- Estado final del inventario ---");
console.log(inventario);
