const supabase = require('../supabase');

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

function camposEditables(datos) {
  const {
    razon_social, nombre_comercial, rtn, telefono, email,
    cai, cai_rango_desde, cai_rango_hasta, cai_fecha_limite
  } = datos;

  return {
    razon_social, nombre_comercial, rtn, telefono, email,
    cai, cai_rango_desde, cai_rango_hasta, cai_fecha_limite
  };
}

function crearProveedor(datos) {
  return supabase
    .from('proveedores')
    .insert({ empresa_id: datos.empresa_id, ...camposEditables(datos) })
    .select()
    .single();
}

function listarProveedores(empresaId) {
  return supabase
    .from('proveedores')
    .select('*')
    .eq('empresa_id', empresaId)
    .eq('activo', true)
    .order('razon_social');
}

function actualizarProveedor(id, datos) {
  return supabase
    .from('proveedores')
    .update({ ...camposEditables(datos), updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('empresa_id', datos.empresa_id)
    .select()
    .maybeSingle();
}

module.exports = {
  validarProveedor,
  crearProveedor,
  listarProveedores,
  actualizarProveedor
};
