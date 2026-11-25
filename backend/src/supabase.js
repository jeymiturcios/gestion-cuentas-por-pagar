const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = url && clave ? createClient(url, clave) : null;

module.exports = supabase;