const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');


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
//agregar registro de proveedores con validacion de RTN y CAI
app.post('/api/proveedores', async (req, res) => {
  const {
    empresa_id, razon_social, nombre_comercial, rtn, telefono, email,
    cai, cai_rango_desde, cai_rango_hasta, cai_fecha_limite
  } = req.body;

  if (!empresa_id) {
    return res.status(400).json({ error: 'La empresa es obligatoria' });
  }

  if (!razon_social || razon_social.trim() === '') {
    return res.status(400).json({ error: 'La razon social es obligatoria' });
  }

  if (!nombre_comercial || nombre_comercial.trim() === '') {
    return res.status(400).json({ error: 'El nombre comercial es obligatorio' });
  }

  if (rtn && !/^\d{14}$/.test(rtn)) {
    return res.status(400).json({ error: 'El RTN debe tener 14 digitos' });
  }

  if (cai) {
    if (!cai_rango_desde || !cai_rango_hasta) {
      return res.status(400).json({ error: 'El CAI requiere el rango autorizado completo' });
    }
    if (!cai_fecha_limite) {
      return res.status(400).json({ error: 'El CAI requiere la fecha limite de emision' });
    }
  }

  const { data, error } = await supabase
    .from('proveedores')
    .insert({
      empresa_id, razon_social, nombre_comercial, rtn, telefono, email,
      cai, cai_rango_desde, cai_rango_hasta, cai_fecha_limite
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: 'No se pudo registrar el proveedor' });
  }

  res.status(201).json(data);
});
//agregar listado de proveedores activos por empresa
app.get('/api/proveedores', async (req, res) => {
  const { empresa_id } = req.query;

  if (!empresa_id) {
    return res.status(400).json({ error: 'La empresa es obligatoria' });
  }

  const { data, error } = await supabase
    .from('proveedores')
    .select('*')
    .eq('empresa_id', empresa_id)
    .eq('activo', true)
    .order('razon_social');

  if (error) {
    return res.status(500).json({ error: 'No se pudieron obtener los proveedores' });
  }

  res.json(data);
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.originalUrl
  });
});

module.exports = app;