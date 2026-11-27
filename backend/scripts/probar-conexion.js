require('dotenv').config();

const supabase = require('../src/supabase');

async function probarConexion() {
  const { data, error } = await supabase.from('empresas').select('id');

  if (error) {
    console.error('Error al conectar:', error.message);
    return;
  }

  console.log(`Conexion correcta. Empresas registradas: ${data.length}`);
}

probarConexion();