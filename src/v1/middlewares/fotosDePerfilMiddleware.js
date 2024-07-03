// fotosDePerfilMiddleware.js

const multer = require('multer');
const storage = require('../../v1/multerConfig');

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
  upload
};