const express = require('express');
const cors = require('cors');

const NOMBRE_SERVICIO = 'cuentas-por-pagar-api';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    estado: 'ok',
    servicio: NOMBRE_SERVICIO,
    version: process.env.npm_package_version || '0.1.0',
    fecha: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.originalUrl
  });
});

module.exports = app;