// tipoDocumentoModel.js

const { connectToDatabase } = require('../../db');

// Obtener todos los tipos de documentos
const obtenerTiposDocumentos = async () => {
  let connection;
  try {
    connection = await connectToDatabase();
    const [tiposDocumentos] = await connection.execute('SELECT * FROM tiposdocumentos');
    return tiposDocumentos;
  } catch (error) {
    throw new Error('Error al obtener todos los tipos de documentos desde la base de datos');
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Obtener un tipo de documento por ID
const obtenerTipoDocumentoPorId = async (id) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const [result] = await connection.execute('SELECT * FROM tiposdocumentos WHERE id = ?', [id]);
    if (result.length === 0) {
      return null;
    }
    return result[0];
  } catch (error) {
    throw new Error('Error al obtener el tipo de documento por ID desde la base de datos');
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Crear un nuevo tipo de documento
const crearTipoDocumento = async (nombre) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const [result] = await connection.execute('INSERT INTO tiposdocumentos (nombre) VALUES (?)', [nombre]);
    return result.insertId;
  } catch (error) {
    throw new Error('Error al crear el tipo de documento en la base de datos');
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Actualizar un tipo de documento por ID
const actualizarTipoDocumento = async (id, nombre) => {
  let connection;
  try {
    connection = await connectToDatabase();
    await connection.execute('UPDATE tiposdocumentos SET nombre = ? WHERE id = ?', [nombre, id]);
  } catch (error) {
    throw new Error('Error al actualizar el tipo de documento en la base de datos');
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Eliminar un tipo de documento por ID
const eliminarTipoDocumento = async (id) => {
  let connection;
  try {
    connection = await connectToDatabase();
    await connection.execute('DELETE FROM tiposdocumentos WHERE id = ?', [id]);
  } catch (error) {
    throw new Error('Error al eliminar el tipo de documento desde la base de datos');
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

module.exports = {
  obtenerTiposDocumentos,
  obtenerTipoDocumentoPorId,
  crearTipoDocumento,
  actualizarTipoDocumento,
  eliminarTipoDocumento
};