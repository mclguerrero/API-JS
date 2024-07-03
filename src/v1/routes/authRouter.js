// authRouter.js

const express = require('express');
const router = express.Router();
const { validarUsuario } = require('../middlewares/usuariosMiddlewar');
const { 
    login,
    register 
} = require('../controllers/authController');

/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               pass:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Correo electrónico o contraseña incorrectos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', login);

/**
 * @openapi
 * /api/v1/register:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Registro de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *                 example: Juan
 *               apellidos:
 *                 type: string
 *                 example: Pérez
 *               tipoDocumento_id:
 *                 type: integer
 *                 example: 1
 *               nroDocumento:
 *                 type: string
 *                 example: "1234567890"
 *               celular:
 *                 type: string
 *                 example: "3001234567"
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               pass:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
router.post('/register', validarUsuario, register);

module.exports = router;