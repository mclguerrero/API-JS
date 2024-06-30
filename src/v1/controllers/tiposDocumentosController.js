// tipoDocumentoController.js

const { connectToDatabase } = require('../../../db');
const { obtenerTiposDocumentos, obtenerTipoDocumentoPorId, crearTipoDocumento, actualizarTipoDocumento, eliminarTipoDocumento } = require('../models/tiposDocumentosModel');

// Obtener todos los tipos de documentos
const obtenerTiposDocumentosController = async (req, res) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const tiposDocumentos = await obtenerTiposDocumentos();
    res.json(tiposDocumentos);
  } catch (error) {
    console.error('Error al obtener todos los tipos de documentos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Obtener un tipo de documento por ID
const obtenerTipoDocumentoPorIdController = async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await connectToDatabase();
    const tipoDocumento = await obtenerTipoDocumentoPorId(id);
    if (!tipoDocumento) {
      return res.status(404).json({ error: 'Tipo de documento no encontrado' });
    }
    res.json(tipoDocumento);
  } catch (error) {
    console.error('Error al obtener el tipo de documento por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Crear un nuevo tipo de documento
const crearTipoDocumentoController = async (req, res) => {
  const { nombre } = req.body;
  let connection;
  try {
    connection = await connectToDatabase();
    const tipoDocumentoId = await crearTipoDocumento(nombre);
    res.status(201).json({ message: 'Tipo de documento creado correctamente', id: tipoDocumentoId });
  } catch (error) {
    console.error('Error al crear el tipo de documento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Actualizar un tipo de documento por ID
const actualizarTipoDocumentoController = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  let connection;
  try {
    connection = await connectToDatabase();
    await actualizarTipoDocumento(id, nombre);
    res.json({ message: 'Tipo de documento actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el tipo de documento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Eliminar un tipo de documento por ID
const eliminarTipoDocumentoController = async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await connectToDatabase();
    await eliminarTipoDocumento(id);
    res.json({ message: 'Tipo de documento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el tipo de documento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

module.exports = {
  obtenerTiposDocumentosController,
  obtenerTipoDocumentoPorIdController,
  crearTipoDocumentoController,
  actualizarTipoDocumentoController,
  eliminarTipoDocumentoController
};
