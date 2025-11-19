function miHash(input, salt) {
  let hash = 0;
  const inputConSalt = input + salt;
  if (inputConSalt.length === 0) return "000000000";
  for (let i = 0; i < inputConSalt.length; i++) {
    const charCode = inputConSalt.charCodeAt(i);
    hash = (hash | 5) - hash * charCode;
    hash = hash << 5;
  }
  return Math.abs(hash).toString().padStart(8, "0");
}

function verificarHash(input, hash, salt) {
  const hashCalculado = miHash(input, salt);
  return hash === hashCalculado;
}

let hashGuardados = {
  /* Ejemplo de hashes guardados
        "userid": {
            hash: "valor del hash",
            salt: "valor del salt"
        }
    */
};

function simularRegistro(input) {
  const salt = Math.random().toString(36).substring(2, 15);
  const hash = miHash(input, salt);
  hashGuardados[hash] = { hash, salt };
  console.log(`Registrado: ${input}`);
  console.log(`Hash: ${hash}`);
  console.log(`Salt: ${salt}`);
}

function simularLogin(input, userid) {
  const registro = hashGuardados[userid];
  if (registro) {
    const { hash, salt } = registro;
    if (verificarHash(input, hash, salt)) {
      console.log(`Login exitoso para: ${input}`);
      return;
    }
  }
  console.log(`Login fallido para: ${input}`);
}

// Ejemplo de uso
simularRegistro("password123");
simularRegistro("qwerty456");

const userid1 = Object.keys(hashGuardados)[0];
const userid2 = Object.keys(hashGuardados)[1];

simularLogin("password123", userid1);
simularLogin("qwerty456", userid1);
simularLogin("qwerty456", userid2);
