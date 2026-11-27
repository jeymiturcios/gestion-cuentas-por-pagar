const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');

const NOMBRE_SERVICIO = 'cuentas-por-pagar-api';

function validarProveedor(datos) {
  const {
    empresa_id, razon_social, nombre_comercial, rtn,
    cai, cai_rango_desde, cai_rango_hasta, cai_fecha_limite
  } = datos;

  if (!empresa_id) {
    return 'La empresa es obligatoria';
  }

  if (!razon_social || razon_social.trim() === '') {
    return 'La razon social es obligatoria';
  }

  if (!nombre_comercial || nombre_comercial.trim() === '') {
    return 'El nombre comercial es obligatorio';
  }

  if (rtn && !/^\d{14}$/.test(rtn)) {
    return 'El RTN debe tener 14 digitos';
  }

  if (cai) {
    if (!cai_rango_desde || !cai_rango_hasta) {
      return 'El CAI requiere el rango autorizado completo';
    }
    if (!cai_fecha_limite) {
      return 'El CAI requiere la fecha limite de emision';
    }
  }

  return null;
}

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

  const errorDeValidacion = validarProveedor(req.body);
  if (errorDeValidacion) {
    return res.status(400).json({ error: errorDeValidacion });
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

app.put('/api/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  const {
    empresa_id, razon_social, nombre_comercial, rtn, telefono, email,
    cai, cai_rango_desde, cai_rango_hasta, cai_fecha_limite
  } = req.body;

  const errorDeValidacion = validarProveedor(req.body);
  if (errorDeValidacion) {
    return res.status(400).json({ error: errorDeValidacion });
  }

  const { data, error } = await supabase
    .from('proveedores')
    .update({
      razon_social, nombre_comercial, rtn, telefono, email,
      cai, cai_rango_desde, cai_rango_hasta, cai_fecha_limite,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('empresa_id', empresa_id)
    .select()
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: 'No se pudo actualizar el proveedor' });
  }

  if (!data) {
    return res.status(404).json({ error: 'Proveedor no encontrado' });
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