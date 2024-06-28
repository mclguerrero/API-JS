//usuariosRouter.js 

const express = require('express');
const router = express.Router();
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerFotoPerfil,
  actualizarFotoPerfil,
  eliminarFotoPerfil
} = require('../controllers/usuariosController');
const { validarUsuario } = require('../middlewares/usuariosMiddlewar');
const { upload } = require('../middlewares/usuariosMiddlewar');

/**
 * @openapi
 * components:
 *   schemas:
 *     Usuarios:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombres:
 *           type: string
 *           example: Juan
 *         apellidos:
 *           type: string
 *           example: Pérez
 *         tipoDocumento_id:
 *           type: integer
 *           example: 1
 *         nroDocumento:
 *           type: string
 *           example: 1234567890
 *         celular:
 *           type: string
 *           example: 9876543210
 *         email:
 *           type: string
 *           example: juan.perez@example.com
 *         pass:
 *           type: string
 *           example: "$2b$10$EixZaYVK1fsbw1ZfbX3OXe"
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           example: "2023-06-25T14:21:56Z"
 *         photo:
 *           type: string
 *           example: "https://example.com/photos/juan.jpg"
 *         isActivo:
 *           type: integer
 *           example: 1
 */

// Obtener todos los usuarios
/**
 * @openapi
 * /api/v1/usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombres:
 *                     type: string
 *                   apellidos:
 *                     type: string
 *                   tipoDocumento_id:
 *                     type: integer
 *                   nroDocumento:
 *                     type: string
 *                   celular:
 *                     type: string
 *                   email:
 *                     type: string
 *                   pass:
 *                     type: string
 *                   fecha_creacion:
 *                     type: string
 *                     format: date-time
 *                   photo:
 *                     type: string
 *                   isActivo:
 *                     type: integer
 */
router.get('/usuarios', obtenerUsuarios);
// Obtener un usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombres:
 *                   type: string
 *                 apellidos:
 *                   type: string
 *                 tipoDocumento_id:
 *                   type: integer
 *                 nroDocumento:
 *                   type: string
 *                 celular:
 *                   type: string
 *                 email:
 *                   type: string
 *                 pass:
 *                   type: string
 *                 fecha_creacion:
 *                   type: string
 *                   format: date-time
 *                 photo:
 *                   type: string
 *                 isActivo:
 *                   type: integer
 */
router.get('/usuarios/:id', obtenerUsuarioPorId);
// Crear un nuevo usuario
/**
 * @openapi
 * /api/v1/usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipoDocumento_id:
 *                 type: integer
 *               nroDocumento:
 *                 type: string
 *               celular:
 *                 type: string
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *               photo:
 *                 type: string
 *               isActivo:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 */
router.post('/usuarios', validarUsuario, crearUsuario);

// Actualizar un usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar un usuario por ID
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
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipoDocumento_id:
 *                 type: integer
 *               nroDocumento:
 *                 type: string
 *               celular:
 *                 type: string
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *               photo:
 *                 type: string
 *               isActivo:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/usuarios/:id', actualizarUsuario);
// Eliminar un usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/usuarios/:id', eliminarUsuario);
// Eliminar usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       '200':
 *         description: Usuario eliminado exitosamente
 *       '404':
 *         description: Usuario no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/usuarios/:id', eliminarUsuario);


//FOTO DE PERFIL


// Obtener la foto de perfil de un usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}/foto:
 *   get:
 *     summary: Obtener foto de perfil de usuario por ID
 *     tags:
 *       - Usuarios
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
router.get('/usuarios/:id/foto', obtenerFotoPerfil);

// Actualizar la foto de perfil de un usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}/foto:
 *   put:
 *     summary: Actualizar foto de perfil de usuario por ID
 *     tags:
 *       - Usuarios
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
router.put('/usuarios/:id/foto', upload, actualizarFotoPerfil);

// Eliminar la foto de perfil de un usuario por ID
/**
 * @openapi
 * /api/v1/usuarios/{id}/foto:
 *   delete:
 *     summary: Eliminar foto de perfil de usuario por ID
 *     tags:
 *       - Usuarios
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
router.delete('/usuarios/:id/foto', eliminarFotoPerfil);

module.exports = router;