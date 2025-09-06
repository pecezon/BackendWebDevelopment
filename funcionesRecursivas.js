const menu = {
  nombre: "Todas las Categorías",
  subcategorias: [
    {
      nombre: "Electrónica",
      subcategorias: [
        { nombre: "Celulares", subcategorias: [] },
        {
          nombre: "Laptops",
          subcategorias: [
            { nombre: "Gaming", subcategorias: [] },
            { nombre: "Oficina", subcategorias: [] },
          ],
        },
      ],
    },
    {
      nombre: "Ropa",
      subcategorias: [
        { nombre: "Dama", subcategorias: [] },
        { nombre: "Caballero", subcategorias: [] },
      ],
    },
    {
      nombre: "Hogar",
      subcategorias: [], // Esta categoría no tiene subcategorías
    },
  ],
};

function imprimirMenu(categoria, nivel) {
  console.log(`${"-".repeat(nivel * 2)}${categoria.nombre}`);

  for (let sub of categoria.subcategorias) {
    imprimirMenu(sub, nivel + 1);
  }
}

imprimirMenu(menu, 0);
