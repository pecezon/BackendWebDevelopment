class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
    this.fechaRegistro = new Date();
    this.estaActivo = true;
  }

  presentarse() {
    console.log(`Hola soy ${this.nombre} y mi email es ${this.email}`);
  }

  cambiarEstado() {
    this.estaActivo = !this.estaActivo;
    if (this.estaActivo) {
      console.log(`El estado de ${this.nombre} ahora es activo`);
    } else {
      console.log(`El estado de ${this.nombre} ahora es inactivo`);
    }
  }
}

const usuario1 = new Usuario("Carlos", "carlos@hola.com");
const usuario2 = new Usuario("Ana", "ana@gmail.com");

usuario1.presentarse();
usuario2.presentarse();

usuario1.cambiarEstado();
console.log(usuario1);
console.log(usuario2);
