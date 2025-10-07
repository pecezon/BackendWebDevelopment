class Personaje {
  constructor(nombre, vida) {
    this.nombre = nombre;
    this.vida = vida;
  }

  recibirDaño(cantidad) {
    this.vida -= cantidad;
    if (this.vida < 0) this.vida = 0;
    console.log(
      `${this.nombre} recibe ${cantidad} de daño. Vida restante: ${this.vida}`
    );
  }

  estaVivo() {
    return this.vida > 0;
  }
}

class Guerrero extends Personaje {
  constructor(nombre, vida, fuerza) {
    super(nombre, vida);
    this.fuerza = fuerza;
  }

  atacar(objetivo) {
    console.log(`${this.nombre} golpea con su espada`);
    objetivo.recibirDaño(this.fuerza);
  }
}

class Mago extends Personaje {
  constructor(nombre, vida, poderMagico) {
    super(nombre, vida);
    this.poderMagico = poderMagico;
  }

  atacar(objetivo) {
    console.log(`${this.nombre} lanza una bola de fuego`);
    objetivo.recibirDaño(this.poderMagico);
  }
}

class Villano extends Personaje {
  constructor(nombre, vida, habilidad, poder) {
    super(nombre, vida);
    this.habilidad = habilidad;
    this.poder = poder;
  }

  atacar(objetivo) {
    console.log(`${this.nombre} usa su ${this.habilidad}`);
    objetivo.recibirDaño(this.poder);

    if (this.habilidad === "Robar vida") {
      const curacion = Math.floor(this.poder / 2);
      this.vida += curacion;
      console.log(
        `${this.nombre} se cura ${curacion} puntos de vida robando energia. Vida actual: ${this.vida}`
      );
    }
  }

  monologoMalvado() {
    console.log(
      `"${this.nombre}: La raza no puede con mi musica tan insoportable jajaja!"`
    );
  }
}

function simularCombate(personaje1, personaje2) {
  console.log("¡Comienza el combate!");
  let turno = 1;

  while (personaje1.estaVivo() && personaje2.estaVivo()) {
    console.log(`Turno ${turno}`);

    personaje1.atacar(personaje2);
    if (!personaje2.estaVivo()) {
      console.log(
        `${personaje2.nombre} ha caído. ${personaje1.nombre} es el vencedor.`
      );
      break;
    }

    personaje2.atacar(personaje1);
    if (!personaje1.estaVivo()) {
      console.log(
        `${personaje1.nombre} ha caido ${personaje2.nombre} es el vencedor`
      );
      break;
    }

    turno++;
  }
}

const heroe = new Guerrero("Kanye Wes", 40, 8);
const villano = new Villano("Tailor Swift", 50, "Robar vida", 10);

villano.monologoMalvado();
simularCombate(heroe, villano);
