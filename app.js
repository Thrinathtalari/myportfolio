const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

// ===== SAFE DB CONNECT (no crash) =====
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log("DB Error (app still runs):", err.message));

// ===== MODELS =====
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
app.post('/api/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await new User({ email: req.body.email, password: hashed }).save();
  res.json({ success: true });
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// ===== CONTACT =====
app.post('/api/contact', async (req, res) => {
  try {
    await new Contact(req.body).save();
    res.json({ success: true });
  } catch {
    res.json({ success: false, message: "DB not ready" });
  }
});

// ===== FRONTEND (ULTRA UI) =====
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ultra Portfolio</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<style>
body {
  margin:0;
  background:black;
  color:white;
  font-family:sans-serif;
}
canvas {
  position:fixed;
  z-index:-1;
}
section {
  padding:100px;
}
.glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  padding:20px;
  border-radius:15px;
  margin-bottom:20px;
}
button {
  padding:10px;
  margin-top:10px;
}
</style>
</head>

<body>

<h1 style="text-align:center;">🚀 Thrinath Ultra Portfolio</h1>

<section>
<div class="glass">
<h2>Register</h2>
<input id="rEmail" placeholder="email">
<input id="rPass" type="password" placeholder="password">
<button onclick="register()">Register</button>
</div>

<div class="glass">
<h2>Login</h2>
<input id="email" placeholder="email">
<input id="pass" type="password" placeholder="password">
<button onclick="login()">Login</button>
</div>

<div class="glass">
<h2>Contact</h2>
<input id="name" placeholder="name">
<input id="msg" placeholder="message">
<button onclick="send()">Send</button>
</div>
</section>

<script>
// ===== API =====
async function register() {
  await fetch('/api/register', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      email: rEmail.value,
      password: rPass.value
    })
  });
  alert("Registered");
}

async function login() {
  const res = await fetch('/api/login', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      email: email.value,
      password: pass.value
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
      name: name.value,
      message: msg.value
    })
  });
  alert("Saved");
}

// ===== 3D BACKGROUND =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i=0;i<8000;i++){
  vertices.push(Math.random()*2000-1000, Math.random()*2000-1000, Math.random()*2000-1000);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
const material = new THREE.PointsMaterial({color:0x00ffff});
const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 500;

function animate(){
  requestAnimationFrame(animate);
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

// ===== ANIMATION =====
gsap.from("h1",{y:-100,opacity:0,duration:1});
gsap.from(".glass",{y:50,opacity:0,stagger:0.2});
</script>

</body>
</html>
`);
});

// ===== START =====
app.listen(3000, () => console.log("Server running"));
