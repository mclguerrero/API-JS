//tipoDocumentoController.js

const {
    getAllDocumentTypes,
    getDocumentTypeById,
    createDocumentType,
    updateDocumentType,
    deleteDocumentType
  } = require('../models/tiposDocumentosModel');
  
  // Obtener todos los tipos de documentos
  const obtenerTiposDocumentos = async (req, res) => {
    try {
      const tiposDocumentos = await getAllDocumentTypes();
      res.json(tiposDocumentos);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  
  // Obtener un tipo de documento por ID
  const obtenerTipoDocumentoPorId = async (req, res) => {
    const { id } = req.params;
    try {
      const tipoDocumento = await getDocumentTypeById(id);
      res.json(tipoDocumento);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  
  // Crear un nuevo tipo de documento
  const crearTipoDocumento = async (req, res) => {
    try {
      const newDocumentType = await createDocumentType(req.body);
      res.status(201).json(newDocumentType);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  
  // Actualizar un tipo de documento por ID
  const actualizarTipoDocumento = async (req, res) => {
    const { id } = req.params;
    try {
      const message = await updateDocumentType(id, req.body);
      res.json(message);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  
  // Eliminar un tipo de documento por ID
  const eliminarTipoDocumento = async (req, res) => {
    const { id } = req.params;
    try {
      const message = await deleteDocumentType(id);
      res.json(message);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  
  module.exports = {
    obtenerTiposDocumentos,
    obtenerTipoDocumentoPorId,
    crearTipoDocumento,
    actualizarTipoDocumento,
    eliminarTipoDocumento
  };
  