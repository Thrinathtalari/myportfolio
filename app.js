const express = require('express');
const path = require('path');

const app = express();

// Serve static files (optional future use)
app.use(express.static('public'));

// Main route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>My Portfolio</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 100px;
            background-color: #0f172a;
            color: white;
          }
          h1 {
            font-size: 40px;
          }
          p {
            font-size: 20px;
            color: #38bdf8;
          }
        </style>
      </head>
      <body>
        <h1>🚀 AUTO DEPLOY SUCCESS</h1>
        <p>Your CI/CD pipeline is working perfectly!</p>
      </body>
    </html>
  `);
});

// API route (test)
app.get('/api', (req, res) => {
  res.json({
    status: "success",
    message: "API is working 🚀"
  });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
