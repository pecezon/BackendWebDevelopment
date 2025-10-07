const fetch = require("node-fetch");
const url = "https://api.chucknorris.io/jokes/random";

// Usando .then()
console.log("Pidiendo un dato con la .then()");
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data.value))
  .catch((error) => console.error("Error:", error));

// Usando async/await
console.log("Pidiendo un dato con async/await");
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.value);
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchData();
