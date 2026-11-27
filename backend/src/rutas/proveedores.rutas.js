const express = require('express');
const {
  validarProveedor,
  crearProveedor,
  listarProveedores,
  actualizarProveedor
} = require('../servicios/proveedores.servicio');

const router = express.Router();

router.post('/', async (req, res) => {
  const errorDeValidacion = validarProveedor(req.body);
  if (errorDeValidacion) {
    return res.status(400).json({ error: errorDeValidacion });
  }

  const { data, error } = await crearProveedor(req.body);

  if (error) {
    return res.status(500).json({ error: 'No se pudo registrar el proveedor' });
  }

  res.status(201).json(data);
});

router.get('/', async (req, res) => {
  const { empresa_id } = req.query;

  if (!empresa_id) {
    return res.status(400).json({ error: 'La empresa es obligatoria' });
  }

  const { data, error } = await listarProveedores(empresa_id);

  if (error) {
    return res.status(500).json({ error: 'No se pudieron obtener los proveedores' });
  }

  res.json(data);
});

router.put('/:id', async (req, res) => {
  const errorDeValidacion = validarProveedor(req.body);
  if (errorDeValidacion) {
    return res.status(400).json({ error: errorDeValidacion });
  }

  const { data, error } = await actualizarProveedor(req.params.id, req.body);

  if (error) {
    return res.status(500).json({ error: 'No se pudo actualizar el proveedor' });
  }

  if (!data) {
    return res.status(404).json({ error: 'Proveedor no encontrado' });
  }

  res.json(data);
});

module.exports = router;
