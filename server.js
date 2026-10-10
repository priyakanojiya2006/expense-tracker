const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "data", "users.json");

fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"), { index: false }));

app.get("/", (req, res) => {
  res.sendFile("Navbar.html", { root: path.join(__dirname, "public") });
});

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const users = readUsers();
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: "Email already registered" });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashed });
  saveUsers(users);
  res.status(201).json({ message: "Account created successfully" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = readUsers().find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ name: user.name, email: user.email });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));