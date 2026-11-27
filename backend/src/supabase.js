const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Cliente con permisos de servidor: ignora las politicas RLS.
// Solo se usa desde la API, nunca desde el navegador.
// Si faltan las variables queda en null, para que las pruebas y el CI
// puedan cargar la app sin un archivo .env.
const supabase = url && clave ? createClient(url, clave) : null;

module.exports = supabase;