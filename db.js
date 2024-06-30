// db.js

const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'bd_js'
    });

    console.log('Connected to MySQL!');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error; // Propaga el error para manejarlo en otra parte si es necesario
  }
}

module.exports = { connectToDatabase };
