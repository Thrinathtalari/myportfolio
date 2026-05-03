const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thrinath | Ultra Portfolio</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background: black;
  color: white;
  overflow-x: hidden;
}

/* 3D canvas */
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

/* Navbar */
header {
  position: fixed;
  width: 100%;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  backdrop-filter: blur(15px);
  background: rgba(255,255,255,0.05);
}

nav a {
  margin-left: 20px;
  color: white;
  text-decoration: none;
}
nav a:hover {
  color: #00f7ff;
}

/* Sections */
section {
  padding: 120px 60px;
}

/* Hero */
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero h1 {
  font-size: 70px;
}

.hero span {
  color: #00f7ff;
}

.hero p {
  margin-top: 15px;
  opacity: 0.7;
}

/* Cards */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px,1fr));
  gap: 20px;
}

.card {
  padding: 25px;
  border-radius: 20px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  transition: 0.4s;
}
.card:hover {
  transform: translateY(-10px) scale(1.05);
}

/* Footer */
footer {
  text-align: center;
  padding: 40px;
}
</style>
</head>

<body>

<header>
  <h2>Thrinath</h2>
  <nav>
    <a href="#">Home</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
  </nav>
</header>

<section class="hero">
  <h1>Hello, I'm <span>Thrinath</span></h1>
  <p>AWS | DevOps | Cloud Engineer</p>
</section>

<section id="skills">
  <h2>⚡ Skills</h2>
  <div class="cards">
    <div class="card">AWS EC2, S3, IAM</div>
    <div class="card">CI/CD Pipelines</div>
    <div class="card">Docker & Linux</div>
  </div>
</section>

<section id="projects">
  <h2>🚀 Projects</h2>
  <div class="cards">
    <div class="card">Auto Deploy (GitHub → EC2)</div>
    <div class="card">Nginx + PM2 Setup</div>
    <div class="card">Portfolio System</div>
  </div>
</section>

<footer>
  <p>© 2026 Thrinath | Built with DevOps ❤️</p>
</footer>

<script>
// THREE.JS BACKGROUND
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 8000; i++) {
  vertices.push(
    Math.random()*2000-1000,
    Math.random()*2000-1000,
    Math.random()*2000-1000
  );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
const material = new THREE.PointsMaterial({color:0x00f7ff});
const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 500;

function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

// GSAP ANIMATIONS
gsap.from(".hero h1", {y:100, opacity:0, duration:1});
gsap.from(".hero p", {y:50, opacity:0, delay:0.5});

gsap.from(".card", {
  scrollTrigger: ".card",
  opacity:0,
  y:50,
  stagger:0.2
});

</script>

</body>
</html>
`);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
