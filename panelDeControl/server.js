const express = require("express");
const cookieParser = require("cookie-parser");
const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const DATA_FILE = path.join(__dirname, "servers.json");
const LOGS_DIR = path.join(__dirname, "logs");
const BACKUPS_DIR = path.join(__dirname, "backups");

class ServidorVirtual {
  constructor(id, name, owner) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.state = "apagado";
    this.logPath = path.join("logs", id + ".log");
  }
}

async function ensureSetup() {
  await fs.mkdir(LOGS_DIR, { recursive: true });
  await fs.mkdir(BACKUPS_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch (e) {
    await fs.writeFile(DATA_FILE, JSON.stringify({}), "utf8");
  }
}

async function readData() {
  const content = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(content);
}

async function writeData(data) {
  var json = JSON.stringify(data, null, 2);
  await fs.writeFile(DATA_FILE, json, "utf8");
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname));

app.use(async function (req, res, next) {
  await ensureSetup();
  if (!req.cookies.adminId) {
    var id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    res.cookie("adminId", id, { httpOnly: true });
    req.adminId = id;
  } else {
    req.adminId = req.cookies.adminId;
  }
  next();
});

app.get("/api/servers", async function (req, res) {
  var data = await readData();
  var list = [];
  var allServers = Object.values(data);
  for (var i = 0; i < allServers.length; i++) {
    if (allServers[i].owner === req.adminId) {
      list.push(allServers[i]);
    }
  }
  res.json(list);
});

app.post("/api/servers", async function (req, res) {
  var name = req.body.name;
  if (!name) {
    res.status(400).send("Falta nombre del servidor");
    return;
  }
  var id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  var server = new ServidorVirtual(id, name, req.adminId);
  var data = await readData();
  data[id] = server;
  await writeData(data);
  await fs.writeFile(path.join(__dirname, server.logPath), "", "utf8");
  res.json(server);
});

app.post("/api/servers/:id/power", async function (req, res) {
  var id = req.params.id;
  var action = req.body.action;
  var data = await readData();
  var server = data[id];
  if (!server || server.owner !== req.adminId) {
    res.status(404).send("Servidor no encontrado");
    return;
  }
  if (action === "encender") {
    server.state = "encendido";
  } else if (action === "apagar") {
    server.state = "apagado";
  } else {
    res.status(400).send("Accion invalida");
    return;
  }
  var line =
    "Servidor " + server.state + " en " + new Date().toISOString() + "\n";
  await fs.appendFile(path.join(__dirname, server.logPath), line, "utf8");
  data[id] = server;
  await writeData(data);
  res.json(server);
});

app.post("/api/servers/:id/backup", async function (req, res) {
  var id = req.params.id;
  var data = await readData();
  var server = data[id];
  if (!server || server.owner !== req.adminId) {
    res.status(404).send("Servidor no encontrado");
    return;
  }
  var src = path.join(__dirname, server.logPath);
  var destName = Date.now().toString(36) + "_" + id + ".log";
  var dest = path.join(BACKUPS_DIR, destName);
  var cmd = "";
  if (process.platform === "win32") {
    cmd = 'copy "' + src + '" "' + dest + '"';
  } else {
    cmd = 'cp "' + src + '" "' + dest + '"';
  }
  exec(cmd, function (error) {
    if (error) {
      res.status(500).send("Error al crear backup");
      return;
    }
    res.json({ ok: true, backup: "backups/" + destName });
  });
});

app.use("/logs", express.static(LOGS_DIR));
app.use("/backups", express.static(BACKUPS_DIR));

app.listen(3000, function () {
  console.log("Servidor corriendo en http://localhost:3000");
});
