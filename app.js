const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thrinath | Premium Portfolio</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  overflow-x: hidden;
  background: black;
  color: white;
}

/* 3D canvas */
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

/* Glass navbar */
header {
  position: fixed;
  width: 100%;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  backdrop-filter: blur(15px);
  background: rgba(255,255,255,0.05);
}

nav a {
  margin-left: 20px;
  text-decoration: none;
  color: white;
  transition: 0.3s;
}
nav a:hover {
  color: #00f7ff;
}

/* Hero */
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeIn 2s ease;
}

.hero h1 {
  font-size: 60px;
}

.hero span {
  color: #00f7ff;
}

.hero p {
  margin-top: 10px;
  font-size: 20px;
  opacity: 0.7;
}

.btn {
  margin-top: 20px;
  padding: 12px 30px;
  border-radius: 30px;
  background: #00f7ff;
  color: black;
  text-decoration: none;
  transition: 0.3s;
}
.btn:hover {
  transform: scale(1.1);
}

/* Cards */
.section {
  padding: 100px 50px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  padding: 20px;
  border-radius: 20px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  transition: 0.4s;
}
.card:hover {
  transform: translateY(-15px) scale(1.05);
  background: rgba(255,255,255,0.1);
}

/* Animation */
@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}
</style>
</head>

<body>

<header>
  <h2>Thrinath</h2>
  <nav>
    <a href="#">Home</a>
    <a href="#projects">Projects</a>
  </nav>
</header>

<div class="hero">
  <h1>Hi, I'm <span>Thrinath</span></h1>
  <p>AWS • DevOps • Cloud Engineer</p>
  <a href="#projects" class="btn">Explore</a>
</div>

<div class="section" id="projects">
  <h2>🚀 Projects</h2>
  <div class="cards">
    <div class="card">
      <h3>CI/CD Pipeline</h3>
      <p>GitHub Actions → AWS EC2 auto deploy</p>
    </div>
    <div class="card">
      <h3>Cloud Infra</h3>
      <p>EC2 + Nginx + PM2 production setup</p>
    </div>
    <div class="card">
      <h3>Portfolio</h3>
      <p>High-end animated web app</p>
    </div>
  </div>
</div>

<!-- THREE JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>

<script>
// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Particles
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 10000; i++) {
  vertices.push(
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000,
    Math.random() * 2000 - 1000
  );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({ color: 0x00f7ff });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 500;

// Animation
function animate() {
  requestAnimationFrame(animate);

  particles.rotation.x += 0.0005;
  particles.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();

// Resize fix
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
</script>

</body>
</html>
  `);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
