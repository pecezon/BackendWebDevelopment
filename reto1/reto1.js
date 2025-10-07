const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.get("/getUserCookie", (req, res) => {
  const userId = req.cookies.userId;
  if (userId) {
    res.status(200).json({ userId });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/setUserCookie", (req, res) => {
  const { userId } = req.body;
  res.cookie("userId", userId, {
    httpOnly: false,
    sameSite: "Lax",
    secure: false,
  });
  res.sendStatus(200);
});

app.post("/clearUserCookie", (req, res) => {
  res.clearCookie("userId");
  res.sendStatus(200);
});

app.post("/changeTheme", (req, res) => {
  const { theme } = req.body;
  res.cookie("theme", theme, {
    httpOnly: false,
    sameSite: "Lax",
    secure: false,
  });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Reto 1 app listening on port ${port}`);
});
