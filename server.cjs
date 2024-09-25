const express = require('express');
const next = require('next');
const cron = require('node-cron');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  
  const port = process.env.PORT || 3000;
  // Configurar cron jobs
  cron.schedule('58 23 * * *', async () => {   
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
    console.log(`Ejecutando tarea a las ${formattedTime}`);
    try {
      const response = await fetch(`http://localhost:${port}/api/cronjobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contraseña: process.env.PASSWORD
        })
      });
      const data = await response.json();
      console.log('Respuesta de la API:', data);
    } catch (error) {
      console.error('Error al llamar a la API:', error.message);
    }
  });

  // Manejar todas las rutas con Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});