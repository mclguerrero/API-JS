//usuariosMiddlewar

const connection = require('../../../db');

const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');

// Middleware para validar antes de crear un usuario
const validarUsuario = [
  body('nombres').notEmpty().withMessage('El campo nombres es obligatorio').isLength({ max: 50 }).withMessage('El campo nombres no puede exceder los 50 caracteres'),
  body('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio').isLength({ max: 45 }).withMessage('El campo apellidos no puede exceder los 45 caracteres'),
  body('tipoDocumento_id').notEmpty().withMessage('El campo tipoDocumento_id es obligatorio').isInt().withMessage('El tipoDocumento_id debe ser un número entero válido'),
  body('nroDocumento').notEmpty().withMessage('El campo nroDocumento es obligatorio').isLength({ max: 10 }).withMessage('El campo nroDocumento no puede exceder los 10 caracteres').isNumeric().withMessage('El campo nroDocumento debe contener solo dígitos'),
  body('celular').notEmpty().withMessage('El campo celular es obligatorio').isLength({ max: 10 }).withMessage('El campo celular no puede exceder los 10 caracteres').isNumeric().withMessage('El campo celular debe contener solo dígitos'),
  body('email').notEmpty().withMessage('El campo email es obligatorio').isEmail().withMessage('El formato del email es inválido').isLength({ max: 155 }).withMessage('El campo email no puede exceder los 155 caracteres'),
  body('pass').notEmpty().withMessage('El campo pass es obligatorio').isStrongPassword().withMessage('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un caracter especial'),
  body('photo').notEmpty().withMessage('El campo photo es obligatorio').isLength({ max: 225 }).withMessage('El campo photo no puede exceder los 225 caracteres'),
  body('isActivo').notEmpty().withMessage('El campo isActivo es obligatorio').isBoolean().withMessage('El campo isActivo debe ser booleano'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tipoDocumento_id, email } = req.body;

    try {
      // Validar que tipoDocumento_id exista en la tabla tiposdocumentos
      const tipoDocumentoQuery = 'SELECT id FROM tiposdocumentos WHERE id = ?';
      const [tipoDocumentoRows] = await connection.query(tipoDocumentoQuery, [tipoDocumento_id]);
      if (tipoDocumentoRows.length === 0) {
        return res.status(400).json({ error: 'El tipoDocumento_id especificado no existe' });
      }

      // Validar que el email no esté duplicado
      const emailQuery = 'SELECT id FROM usuarios WHERE email = ?';
      const [emailRows] = await connection.query(emailQuery, [email]);
      if (emailRows.length > 0) {
        return res.status(400).json({ error: 'Ya existe un usuario registrado con este email' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error al validar los datos' });
    }

    next();
  }
];
// Configuración de multer para la carga de archivos

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/photosProfile/'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    // Nombre del archivo: timestamp + nombre original del archivo
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Middleware para la carga de archivos usando multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Límite de tamaño del archivo (10MB)
  fileFilter: function (req, file, cb) {
    // Validación del tipo de archivo permitido (ejemplo: solo imágenes)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  }
}).single('photo'); // 'photo' es el nombre del campo en el formulario de carga

module.exports = {
  validarUsuario,
  upload
};
