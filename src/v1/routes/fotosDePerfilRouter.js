// fotosDePerfilRouter.js

const express = require('express');
const router = express.Router();
const {
  obtenerFotoPerfilController,
  actualizarFotoPerfilController,
  eliminarFotoPerfilController
} = require('../controllers/fotosDePerfilController');

const {
  upload
} = require('../middlewares/fotosDePerfilMiddleware');

//FOTO DE PERFIL

// Obtener la foto de perfil de un usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}/foto:
 *   get:
 *     summary: Obtener foto de perfil de usuario por ID
 *     tags:
 *       - Foto De Perfil
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       '200':
 *         description: Foto de perfil obtenida exitosamente
 *       '404':
 *         description: Usuario no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/usuarios/:id/foto', obtenerFotoPerfilController);

// Actualizar la foto de perfil de un usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}/foto:
 *   put:
 *     summary: Actualizar foto de perfil de usuario por ID
 *     tags:
 *       - Foto De Perfil
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *       - in: formData
 *         name: photo
 *         type: file
 *         required: true
 *         description: Archivo de imagen (solo archivos de imagen permitidos)
 *     responses:
 *       '200':
 *         description: Foto de perfil actualizada exitosamente
 *       '400':
 *         description: Error al procesar la solicitud
 *       '404':
 *         description: Usuario no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/usuarios/:id/foto', upload, actualizarFotoPerfilController);

// Eliminar la foto de perfil de un usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}/foto:
 *   delete:
 *     summary: Eliminar foto de perfil de usuario por ID
 *     tags:
 *       - Foto De Perfil
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       '200':
 *         description: Foto de perfil eliminada exitosamente
 *       '404':
 *         description: Usuario no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/usuarios/:id/foto', eliminarFotoPerfilController);

module.exports = router;