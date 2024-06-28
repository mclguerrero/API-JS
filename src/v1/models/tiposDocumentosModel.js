const connection = require('../../../db');

// Función para obtener todos los tipos de documentos
const getAllDocumentTypes = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM tiposdocumentos', (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Función para obtener un tipo de documento por ID
const getDocumentTypeById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM tiposdocumentos WHERE id = ?', [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0]);
    });
  });
};

// Función para crear un nuevo tipo de documento
const createDocumentType = (data) => {
  const { nombre } = data;
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO tiposdocumentos (nombre) VALUES (?)', [nombre], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve({ id: results.insertId });
    });
  });
};

// Función para actualizar un tipo de documento por ID
const updateDocumentType = (id, data) => {
  const { nombre } = data;
  return new Promise((resolve, reject) => {
    connection.query('UPDATE tiposdocumentos SET nombre = ? WHERE id = ?', [nombre, id], (error) => {
      if (error) {
        return reject(error);
      }
      resolve({ message: 'Tipo de documento actualizado' });
    });
  });
};

// Función para eliminar un tipo de documento por ID
const deleteDocumentType = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM tiposdocumentos WHERE id = ?', [id], (error) => {
      if (error) {
        return reject(error);
      }
      resolve({ message: 'Tipo de documento eliminado' });
    });
  });
};

module.exports = {
  getAllDocumentTypes,
  getDocumentTypeById,
  createDocumentType,
  updateDocumentType,
  deleteDocumentType
};
