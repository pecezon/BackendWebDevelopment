const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

const sesiones = {
  "abc-123": { nombre: "Juan", profesion: "Desarrollador" },
};

app.get("/", (req, res) => {
  const { sessionId } = req.cookies;
  const datosUsuario = sesiones[sessionId];
  if (datosUsuario) {
    res.send(`
            <h1>Bienvenido ${datosUsuario.nombre}</h1>
            <p>Tu profesion es: ${datosUsuario.profesion}</p>
            <button id="btnOscuro">Modo Oscuro</button>
            <button id="btnClaro">Modo Claro</button>
            <script>
                const body = document.body;

                const aplicarTema = (tema) => {
                    if (tema === 'oscuro') {
                        body.style.backgroundColor = 'black';
                        body.style.color = 'white';
                    } else {
                        body.style.backgroundColor = 'white';
                        body.style.color = 'black';
                    }
                }

                document.getElementById('btnOscuro').onclick = () => {
                    aplicarTema('oscuro');
                    localStorage.setItem('tema', 'oscuro');
                }

                document.getElementById('btnClaro').onclick = () => {
                    aplicarTema('claro');
                    localStorage.setItem('tema', 'claro');
                }

                const temaGuardado = localStorage.getItem('tema');
                if (temaGuardado) {
                    aplicarTema(temaGuardado);
                }

            </script>
        `);
  } else {
    res
      .status(401)
      .send("No estas logueado, <a href='/login'>Inicia sesio aqui</a>");
  }
});

app.get("/login", (req, res) => {
  const idDeSesion = "abc-123";
  res.cookie("sessionId", idDeSesion, { maxAge: 900000, httpOnly: true });
  res.send("Has iniciado sesion");
});

app.get("/saludar", async (req, res) => {
  const { name } = req.query;
  if (name) {
    res.cookie("usuario", name, { maxAge: 900000, httpOnly: true });
    res.send(`Hola ${name}, guarde tu nombre y toda tu informacion bancaria`);
  } else {
    res.send("Porfa dime tu nombre");
  }
});

app.get("/saludol", async (req, res) => {
  const userName = req.cookies.usuario;
  if (userName) {
    res.send(`Bienvenido nuevamente ${userName}`);
  } else {
    res.send("Hola visitante, por favor dime tu nombre");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
