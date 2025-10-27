const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL client
const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

// API routes
app.get('/api/grievances', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM grievances ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetching error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/grievances', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO grievances (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Insertion error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve frontend build
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback route: send index.html for any non-API request
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
