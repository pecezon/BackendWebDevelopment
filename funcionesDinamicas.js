const catalogo = [
  {
    id: 1,
    nombre: "Laptop Gamer",
    precio: 25000,
    categoria: "Electrónica",
    stock: 5,
  },
  {
    id: 2,
    nombre: "Playera Casual",
    precio: 350,
    categoria: "Ropa",
    stock: 20,
  },
  {
    id: 3,
    nombre: "Mouse Inalámbrico",
    precio: 450,
    categoria: "Electrónica",
    stock: 15,
  },
  {
    id: 4,
    nombre: "Pantalón de Mezclilla",
    precio: 700,
    categoria: "Ropa",
    stock: 8,
  },
  {
    id: 5,
    nombre: "Libro de Programación",
    precio: 550,
    categoria: "Libros",
    stock: 0,
  },
];

/**
 * Filtra un arreglo de productos basado en un criterio dinámico.
 * @param {Array} productos - El arreglo de productos a filtrar.
 * @param {Function} criterioCallback - La función que devuelve true si el producto cumple el criterio.
 * @returns {Array} Un nuevo arreglo con los productos que pasaron el filtro.
 */
function filtrarProductos(productos, criterioCallback) {
  const productosFiltrados = [];
  for (let producto of productos) {
    if (criterioCallback(producto)) {
      productosFiltrados.push(producto);
    }
  }
  return productosFiltrados;
}

function esBarato(producto) {
  return producto.precio <= 500;
}

function esElectronico(producto) {
  return producto.categoria === "Electrónica";
}

function tieneStock(producto) {
  return producto.stock > 0;
}

const productosBaratos = filtrarProductos(catalogo, esBarato);
console.log("Productos Baratos:", productosBaratos);

const productosElectronicos = filtrarProductos(catalogo, esElectronico);
console.log("Productos Electrónicos:", productosElectronicos);

const productosConStock = filtrarProductos(catalogo, tieneStock);
console.log("Productos con Stock:", productosConStock);

function crearFiltroPorCategoria(categoria) {
  return function (producto) {
    return producto.categoria === categoria;
  };
}

const filtroRopa = crearFiltroPorCategoria("Ropa");
console.log("Productos de Ropa:", filtrarProductos(catalogo, filtroRopa));

const filtroLibros = crearFiltroPorCategoria("Libros");
console.log("Productos de Libros:", filtrarProductos(catalogo, filtroLibros));
