const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== DATA STORAGE =====
const DATA_FILE = 'contacts.json';

// Create file if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// ===== API ROUTES =====

// GET projects
app.get('/api/projects', (req, res) => {
  res.json([
    { name: "CI/CD Pipeline", desc: "GitHub → EC2 automation" },
    { name: "Portfolio", desc: "3D animated website" },
    { name: "Cloud Setup", desc: "AWS EC2 + Nginx + PM2" }
  ]);
});

// GET skills
app.get('/api/skills', (req, res) => {
  res.json([
    "AWS", "Docker", "CI/CD", "Linux", "Node.js"
  ]);
});

// POST contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.push({ name, email, message, time: new Date() });

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ success: true });
});

// ===== FRONTEND =====

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Thrinath Portfolio</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<style>
body { background:black; color:white; font-family:sans-serif; }
section { padding:100px; }
input, textarea { width:100%; margin:10px 0; padding:10px; }
button { padding:10px 20px; }
</style>
</head>

<body>

<h1>🚀 Thrinath Portfolio</h1>

<section>
<h2>Projects</h2>
<div id="projects"></div>
</section>

<section>
<h2>Skills</h2>
<div id="skills"></div>
</section>

<section>
<h2>Contact</h2>
<form id="form">
<input name="name" placeholder="Name" required />
<input name="email" placeholder="Email" required />
<textarea name="message" placeholder="Message"></textarea>
<button>Send</button>
</form>
</section>

<script>
// Load projects
fetch('/api/projects')
.then(res => res.json())
.then(data => {
  document.getElementById('projects').innerHTML =
    data.map(p => '<p>'+p.name+' - '+p.desc+'</p>').join('');
});

// Load skills
fetch('/api/skills')
.then(res => res.json())
.then(data => {
  document.getElementById('skills').innerHTML =
    data.map(s => '<span>'+s+'</span><br>').join('');
});

// Contact form
document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  alert('Message sent!');
});
</script>

</body>
</html>
`);
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
