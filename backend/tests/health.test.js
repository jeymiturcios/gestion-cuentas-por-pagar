const request = require('supertest');

const app = require('../src/app');

describe('GET /api/health', () => {
  it('responde 200 cuando la API esta viva', async () => {
    const respuesta = await request(app).get('/api/health');

    expect(respuesta.statusCode).toBe(200);
  });

  it('devuelve estado ok y el nombre del servicio', async () => {
    const respuesta = await request(app).get('/api/health');

    expect(respuesta.body.estado).toBe('ok');
    expect(respuesta.body.servicio).toBe('cuentas-por-pagar-api');
  });

  it('devuelve la respuesta en formato JSON', async () => {
    const respuesta = await request(app).get('/api/health');

    expect(respuesta.headers['content-type']).toMatch(/json/);
  }); 
});

describe('Rutas no existentes', () => {
  it('responde 404 en JSON cuando la ruta no existe', async () => {
    const respuesta = await request(app).get('/api/ruta-que-no-existe');

    expect(respuesta.statusCode).toBe(404);
    expect(respuesta.body.error).toBe('Ruta no encontrada');
  });
});