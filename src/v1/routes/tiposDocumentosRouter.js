const express = require('express');
const router = express.Router();
const {
  obtenerTiposDocumentosController,
  obtenerTipoDocumentoPorIdController,
  crearTipoDocumentoController,
  actualizarTipoDocumentoController,
  eliminarTipoDocumentoController
} = require('../controllers/tiposDocumentosController');
const { validarTipoDocumento } = require('../middlewares/tiposDocumentosMiddlewar');

/**
 * @openapi
 * components:
 *   schemas:
 *     TiposDocumentos:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: DNI
 */

// Obtener todos los tipos de documentos
/**
 * @openapi
 * /api/v1/tiposdocumentos:
 *   get:
 *     tags:
 *       - TiposDocumentos
 *     summary: Obtener todos los tipos de documentos
 *     responses:
 *       200:
 *         description: Lista de tipos de documentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TiposDocumentos'
 */
router.get('/tiposdocumentos', obtenerTiposDocumentosController);

// Obtener un tipo de documento por ID
/**
 * @swagger
 * /api/v1/tiposdocumentos/{id}:
 *   get:
 *     tags:
 *       - TiposDocumentos
 *     summary: Obtener un tipo de documento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de documento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TiposDocumentos'
 */
router.get('/tiposdocumentos/:id', obtenerTipoDocumentoPorIdController);

// Crear un nuevo tipo de documento
/**
 * @swagger
 * /api/v1/tiposdocumentos:
 *   post:
 *     tags:
 *       - TiposDocumentos
 *     summary: Crear un nuevo tipo de documento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TiposDocumentos'
 *     responses:
 *       201:
 *         description: Tipo de documento creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TiposDocumentos'
 */
router.post('/tiposdocumentos', validarTipoDocumento, crearTipoDocumentoController);

// Actualizar un tipo de documento por ID
/**
 * @swagger
 * /api/v1/tiposdocumentos/{id}:
 *   put:
 *     tags:
 *       - TiposDocumentos
 *     summary: Actualizar un tipo de documento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TiposDocumentos'
 *     responses:
 *       200:
 *         description: Tipo de documento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TiposDocumentos'
 */
router.put('/tiposdocumentos/:id', validarTipoDocumento, actualizarTipoDocumentoController);

// Eliminar un tipo de documento por ID
/**
 * @swagger
 * /api/v1/tiposdocumentos/{id}:
 *   delete:
 *     tags:
 *       - TiposDocumentos
 *     summary: Eliminar un tipo de documento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de documento eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/tiposdocumentos/:id', eliminarTipoDocumentoController);

module.exports = router;
