//db.js

const mysql = require('mysql2');

// Configura la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bd_js'
});

// Conectar a MySQL
connection.connect(error => {
  if (error) {
    console.error('Error de conexión a MySQL:', error);
    process.exit(1); // Salir del proceso si hay un error de conexión
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

module.exports = connection;
