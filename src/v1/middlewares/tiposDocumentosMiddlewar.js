const validarTipoDocumento = (req, res, next) => {
    const { nombre } = req.body;
  
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre del tipo de documento es obligatorio' });
    }
  
    if (typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre del tipo de documento debe ser una cadena no vacía' });
    }
  
    next();
  };
  
  module.exports = {
    validarTipoDocumento
  };
  