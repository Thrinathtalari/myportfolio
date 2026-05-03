const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thrinath Portfolio</title>

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
      }

      body {
        background: linear-gradient(135deg, #0f172a, #1e293b);
        color: white;
      }

      header {
        display: flex;
        justify-content: space-between;
        padding: 20px 50px;
        position: fixed;
        width: 100%;
        top: 0;
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(10px);
      }

      header h1 {
        color: #38bdf8;
      }

      nav a {
        margin-left: 20px;
        color: white;
        text-decoration: none;
      }

      nav a:hover {
        color: #38bdf8;
      }

      .hero {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      .hero h2 {
        font-size: 50px;
        margin-bottom: 10px;
      }

      .hero span {
        color: #38bdf8;
      }

      .hero p {
        font-size: 20px;
        margin-bottom: 20px;
      }

      .btn {
        padding: 12px 25px;
        background: #38bdf8;
        border-radius: 25px;
        color: black;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s;
      }

      .btn:hover {
        background: white;
      }

      section {
        padding: 80px 50px;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }

      .card {
        background: rgba(255,255,255,0.05);
        padding: 20px;
        border-radius: 15px;
        transition: 0.3s;
      }

      .card:hover {
        transform: translateY(-10px);
        background: rgba(255,255,255,0.1);
      }

      footer {
        text-align: center;
        padding: 20px;
        background: black;
      }
    </style>
  </head>

  <body>

    <header>
      <h1>Thrinath</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <div class="hero">
      <h2>Hi, I'm <span>Thrinath</span> 👋</h2>
      <p>Cloud | AWS | DevOps Enthusiast</p>
      <a class="btn" href="#projects">View Projects</a>
    </div>

    <section id="projects">
      <h2 style="margin-bottom:20px;">🚀 Projects</h2>

      <div class="cards">
        <div class="card">
          <h3>Auto Deploy App</h3>
          <p>CI/CD using GitHub Actions + AWS EC2</p>
        </div>

        <div class="card">
          <h3>Portfolio Website</h3>
          <p>Deployed using Nginx + Node.js</p>
        </div>

        <div class="card">
          <h3>Cloud Project</h3>
          <p>EC2 + S3 + IAM configuration</p>
        </div>
      </div>
    </section>

    <section id="contact">
      <h2>📩 Contact</h2>
      <p>Email: your@email.com</p>
      <p>GitHub: github.com/yourusername</p>
    </section>

    <footer>
      <p>© 2026 Thrinath | Built with ❤️ on AWS</p>
    </footer>

  </body>
  </html>
  `);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
