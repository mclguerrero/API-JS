// usuariosMiddleware.js

const { body, validationResult } = require('express-validator');
const { connectToDatabase } = require('../../db');

const validarUsuario = [
  body('nombres').notEmpty().withMessage('El campo nombres es obligatorio').isLength({ max: 50 }).withMessage('El campo nombres no puede exceder los 50 caracteres'),
  body('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio').isLength({ max: 45 }).withMessage('El campo apellidos no puede exceder los 45 caracteres'),
  body('tipoDocumento_id').notEmpty().withMessage('El campo tipoDocumento_id es obligatorio').isInt().withMessage('El tipoDocumento_id debe ser un número entero válido').custom(async (value, { req }) => {
    // Verificar si el tipoDocumento_id existe en la tabla tiposdocumentos
    const connection = await connectToDatabase();
    const tipoDocumentoQuery = 'SELECT id FROM tiposdocumentos WHERE id = ?';
    const [tipoDocumentoRows] = await connection.execute(tipoDocumentoQuery, [value]);
    if (tipoDocumentoRows.length === 0) {
      throw new Error('El tipoDocumento_id especificado no existe');
    }
    connection.end();
  }),
  body('nroDocumento').notEmpty().withMessage('El campo nroDocumento es obligatorio').isLength({ max: 10 }).withMessage('El campo nroDocumento no puede exceder los 10 caracteres').isNumeric().withMessage('El campo nroDocumento debe contener solo dígitos').custom(async (value, { req }) => {
    // Verificar si el nroDocumento ya está registrado para otro usuario
    const connection = await connectToDatabase();
    const nroDocumentoQuery = 'SELECT id FROM usuarios WHERE nroDocumento = ?';
    const [nroDocumentoRows] = await connection.execute(nroDocumentoQuery, [value]);
    if (nroDocumentoRows.length > 0) {
      throw new Error('Ya existe un usuario registrado con este número de documento');
    }
    connection.end();
  }),
  body('celular').notEmpty().withMessage('El campo celular es obligatorio').isLength({ max: 10 }).withMessage('El campo celular no puede exceder los 10 caracteres').isNumeric().withMessage('El campo celular debe contener solo dígitos'),
  body('email').notEmpty().withMessage('El campo email es obligatorio').isEmail().withMessage('El formato del email es inválido').isLength({ max: 155 }).withMessage('El campo email no puede exceder los 155 caracteres').custom(async (value, { req }) => {
    // Verificar si el email ya está registrado para otro usuario
    const connection = await connectToDatabase();
    const emailQuery = 'SELECT id FROM usuarios WHERE email = ?';
    const [emailRows] = await connection.execute(emailQuery, [value]);
    if (emailRows.length > 0) {
      throw new Error('Ya existe un usuario registrado con este email');
    }
    connection.end();
  }),
  body('pass').notEmpty().withMessage('El campo pass es obligatorio').isLength({ max: 100 }).withMessage('El campo pass no puede exceder los 100 caracteres'),
  body('photo').optional().notEmpty().withMessage('El campo photo es obligatorio').default('icon.jpg'),
  body('isActivo').optional().notEmpty().withMessage('El campo isActivo es obligatorio').isInt().withMessage('El campo isActivo debe ser un número entero válido').default(1),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

];

module.exports = {
  validarUsuario
};