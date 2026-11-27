const request = require('supertest');

jest.mock('../src/supabase', () => ({ from: jest.fn() }));

const supabase = require('../src/supabase');
const app = require('../src/app');

function baseResponde(resultado) {
  const consulta = {
    insert: () => consulta,
    update: () => consulta,
    select: () => consulta,
    eq: () => consulta,
    order: () => Promise.resolve(resultado),
    single: () => Promise.resolve(resultado),
    maybeSingle: () => Promise.resolve(resultado)
  };
  supabase.from.mockReturnValue(consulta);
}

const proveedorValido = {
  empresa_id: 'empresa-1',
  razon_social: 'Distribuidora Ejemplo S. de R.L.',
  nombre_comercial: 'Distribuidora Ejemplo',
  rtn: '08011999123456'
};

beforeEach(() => {
  supabase.from.mockReset();
});

describe('POST /api/proveedores', () => {
  it('responde 400 si falta la empresa', async () => {
    const { empresa_id, ...sinEmpresa } = proveedorValido;

    const respuesta = await request(app).post('/api/proveedores').send(sinEmpresa);

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body.error).toBe('La empresa es obligatoria');
  });

  it('responde 400 si la razon social esta vacia', async () => {
    const respuesta = await request(app)
      .post('/api/proveedores')
      .send({ ...proveedorValido, razon_social: '   ' });

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body.error).toBe('La razon social es obligatoria');
  });

  it('responde 400 si el RTN no tiene 14 digitos', async () => {
    const respuesta = await request(app)
      .post('/api/proveedores')
      .send({ ...proveedorValido, rtn: '0801199912345' });

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body.error).toBe('El RTN debe tener 14 digitos');
  });

  it('responde 400 si trae CAI sin rango autorizado', async () => {
    const respuesta = await request(app)
      .post('/api/proveedores')
      .send({ ...proveedorValido, cai: 'ABC123', cai_fecha_limite: '2027-01-31' });

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body.error).toBe('El CAI requiere el rango autorizado completo');
  });

  it('responde 400 si trae CAI sin fecha limite', async () => {
    const respuesta = await request(app)
      .post('/api/proveedores')
      .send({
        ...proveedorValido,
        cai: 'ABC123',
        cai_rango_desde: '000-001-01-00000001',
        cai_rango_hasta: '000-001-01-00000500'
      });

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body.error).toBe('El CAI requiere la fecha limite de emision');
  });

  it('responde 201 con el proveedor creado', async () => {
    baseResponde({ data: { id: 'prov-1', ...proveedorValido }, error: null });

    const respuesta = await request(app).post('/api/proveedores').send(proveedorValido);

    expect(respuesta.statusCode).toBe(201);
    expect(respuesta.body.id).toBe('prov-1');
  });

  it('responde 500 si la base falla', async () => {
    baseResponde({ data: null, error: { message: 'fallo' } });

    const respuesta = await request(app).post('/api/proveedores').send(proveedorValido);

    expect(respuesta.statusCode).toBe(500);
    expect(respuesta.body.error).toBe('No se pudo registrar el proveedor');
  });
});

describe('GET /api/proveedores', () => {
  it('responde 400 si falta la empresa', async () => {
    const respuesta = await request(app).get('/api/proveedores');

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body.error).toBe('La empresa es obligatoria');
  });

  it('responde 200 con la lista de proveedores', async () => {
    baseResponde({ data: [{ id: 'prov-1' }, { id: 'prov-2' }], error: null });

    const respuesta = await request(app).get('/api/proveedores?empresa_id=empresa-1');

    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.body).toHaveLength(2);
  });
});

describe('PUT /api/proveedores/:id', () => {
  it('responde 400 si el RTN no tiene 14 digitos', async () => {
    const respuesta = await request(app)
      .put('/api/proveedores/prov-1')
      .send({ ...proveedorValido, rtn: '123' });

    expect(respuesta.statusCode).toBe(400);
    expect(respuesta.body.error).toBe('El RTN debe tener 14 digitos');
  });

  it('responde 404 si el proveedor no existe en esa empresa', async () => {
    baseResponde({ data: null, error: null });

    const respuesta = await request(app).put('/api/proveedores/no-existe').send(proveedorValido);

    expect(respuesta.statusCode).toBe(404);
    expect(respuesta.body.error).toBe('Proveedor no encontrado');
  });

  it('responde 200 con el proveedor actualizado', async () => {
    baseResponde({ data: { id: 'prov-1', ...proveedorValido }, error: null });

    const respuesta = await request(app).put('/api/proveedores/prov-1').send(proveedorValido);

    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.body.id).toBe('prov-1');
  });
});