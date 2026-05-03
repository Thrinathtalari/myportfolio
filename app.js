const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// ===== DATABASE =====
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"))
.catch(err=>console.log("DB Error:", err.message));

// ===== MODEL =====
const Contact = mongoose.model('Contact', {
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// ===== API =====
app.post('/api/contact', async (req,res)=>{
  try{
    await new Contact(req.body).save();
    res.json({success:true});
  }catch{
    res.json({success:false});
  }
});

// ===== FRONTEND =====
app.get('/', (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thrinath | Ultra Portfolio</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<style>
*{margin:0;padding:0;box-sizing:border-box}
body{
  background:black;
  color:white;
  font-family: 'Segoe UI', sans-serif;
  overflow-x:hidden;
}

/* ===== NAV ===== */
nav{
  position:fixed;
  width:100%;
  padding:20px;
  display:flex;
  justify-content:space-between;
  background:rgba(0,0,0,0.3);
  backdrop-filter:blur(10px);
  z-index:10;
}

/* ===== HERO ===== */
.hero{
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
}

h1{
  font-size:60px;
  background:linear-gradient(90deg,cyan,magenta);
  -webkit-background-clip:text;
  color:transparent;
}

p{
  opacity:0.7;
}

/* ===== GLASS CARDS ===== */
.section{
  padding:100px 20px;
}

.card{
  background:rgba(255,255,255,0.05);
  padding:30px;
  margin:20px auto;
  width:300px;
  border-radius:15px;
  backdrop-filter:blur(10px);
  transition:0.3s;
}

.card:hover{
  transform:translateY(-10px) scale(1.05);
}

/* ===== INPUT ===== */
input,textarea{
  width:100%;
  padding:10px;
  margin:10px 0;
  border:none;
  border-radius:8px;
}

button{
  padding:10px;
  width:100%;
  border:none;
  border-radius:8px;
  background:cyan;
  color:black;
  cursor:pointer;
}

canvas{
  position:fixed;
  top:0;
  left:0;
  z-index:-1;
}
</style>
</head>

<body>

<nav>
<h2>Thrinath</h2>
<span>Full Stack Dev</span>
</nav>

<div class="hero">
<h1>Ultra Portfolio</h1>
<p>3D • Motion • Backend Powered</p>
</div>

<div class="section">

<div class="card">
<h3>About Me</h3>
<p>Building modern web experiences with backend + cloud.</p>
</div>

<div class="card">
<h3>Projects</h3>
<p>Full stack apps, AWS deployments, automation.</p>
</div>

<div class="card">
<h3>Contact</h3>

<input id="name" placeholder="Name">
<input id="email" placeholder="Email">
<textarea id="msg" placeholder="Message"></textarea>

<button onclick="send()">Send</button>

</div>

</div>

<script>
// ===== API =====
async function send(){
  await fetch('/api/contact',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      name:name.value,
      email:email.value,
      message:msg.value
    })
  });

  alert("Message sent 🚀");
}

// ===== 3D BACKGROUND =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

// particles
const geo = new THREE.BufferGeometry();
const vertices = [];

for(let i=0;i<8000;i++){
  vertices.push(
    Math.random()*2000-1000,
    Math.random()*2000-1000,
    Math.random()*2000-1000
  );
}

geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));

const mat = new THREE.PointsMaterial({color:0x00ffff});
const points = new THREE.Points(geo,mat);
scene.add(points);

camera.position.z = 500;

function animate(){
  requestAnimationFrame(animate);
  points.rotation.y += 0.0015;
  renderer.render(scene,camera);
}
animate();

// ===== ANIMATION =====
gsap.from("h1",{y:-100,opacity:0,duration:1});
gsap.from(".card",{y:50,opacity:0,stagger:0.2});

</script>

</body>
</html>
`);
});

// ===== START =====
app.listen(3000, ()=>console.log("Server running"));
