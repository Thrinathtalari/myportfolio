const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET = "mysecretkey"; // later we move to env

// ===== DATABASE =====
mongoose.connect('mongodb://127.0.0.1:27017/portfolio');

// ===== SCHEMAS =====
const User = mongoose.model('User', {
  email: String,
  password: String
});

const Contact = mongoose.model('Contact', {
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// ===== AUTH =====

// REGISTER
app.post('/api/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    password: hashed
  });

  await user.save();
  res.json({ success: true });
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("User not found");

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, SECRET);

  res.json({ token });
});

// ===== CONTACT =====
app.post('/api/contact', async (req, res) => {
  const msg = new Contact(req.body);
  await msg.save();
  res.json({ success: true });
});

// ===== FRONTEND =====
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Ultra Portfolio</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<style>
body { background:black; color:white; font-family:sans-serif; }
section { padding:100px; }
input, button { padding:10px; margin:5px; }
</style>
</head>

<body>

<h1>🚀 Thrinath Ultra Portfolio</h1>

<section>
<h2>Login</h2>
<input id="email" placeholder="email">
<input id="pass" type="password" placeholder="password">
<button onclick="login()">Login</button>
</section>

<section>
<h2>Contact</h2>
<input id="name" placeholder="name">
<input id="msg" placeholder="message">
<button onclick="send()">Send</button>
</section>

<script>
async function login() {
  const res = await fetch('/api/login', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('pass').value
    })
  });

  const data = await res.json();
  localStorage.setItem('token', data.token);
  alert("Logged in");
}

async function send() {
  await fetch('/api/contact', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      name: document.getElementById('name').value,
      message: document.getElementById('msg').value
    })
  });

  alert("Message saved");
}
</script>

</body>
</html>
`);
});

// ===== START =====
app.listen(3000, () => console.log("Server running"));
