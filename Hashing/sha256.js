const crypto = require("crypto");

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

console.log("Demo de sha 256");
console.log("Hash de Hola: ", sha256("Hola"));
console.log("Hash de Hola: ", sha256("Hola"));
console.log("Hash de hola: ", sha256("hola"));

console.log(
  "Hash de mensaje largo:",
  sha256("Este es un mensaje largo largo largoooooo.")
);

function academicHash(input) {
  let hash = 0;
  if (input.length === 0) return "000000000";
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    hash = (hash << 5) - hash + charCode;
    hash = hash | hash;
  }
  return Math.abs(hash).toString().padStart(8, "0");
}

console.log("Demo de Academic Hash");
console.log("Hash de Hola: ", academicHash("Hola"));
console.log("Hash de Hola: ", academicHash("Hola"));
console.log("Hash de hola: ", academicHash("hola"));
console.log(
  "Hash de mensaje largo:",
  academicHash("Este es un mensaje largo largo largoooooo.")
);
