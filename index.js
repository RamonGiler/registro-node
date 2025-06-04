// index.js
const express = require('express');
const { config } = require('dotenv');
const { Pool } = require('pg');

config(); // Cargar variables de entorno desde .env

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // para que funcione en Render
  },
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Render!');
});

app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en /ping');
  }
});

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto', port);
});
