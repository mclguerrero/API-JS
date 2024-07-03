const { body, validationResult } = require('express-validator');

const validarTipoDocumento = [
  body('nombre')
    .notEmpty().withMessage('El nombre del tipo de documento es obligatorio')
    .isString().withMessage('El nombre del tipo de documento debe ser una cadena')
    .trim()
    .isLength({ min: 1, max: 45 }).withMessage('El nombre del tipo de documento debe tener entre 1 y 45 caracteres'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validarTipoDocumento
};