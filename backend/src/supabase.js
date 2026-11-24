const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const claveServicio = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !claveServicio) {
  throw new Error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el archivo .env');
}

// Cliente con permisos de servidor: ignora las politicas RLS.
// Solo se usa desde la API, nunca desde el navegador.
const supabase = createClient(url, claveServicio);

module.exports = supabase;