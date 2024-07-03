const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/photosProfile/'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Marca de tiempo actual
    const uniqueSuffix = uuidv4(); // UUID único
    const extension = path.extname(file.originalname); // Extensión original del archivo
    cb(null, `${timestamp}-${uniqueSuffix}${extension}`); // Nombre del archivo combinado
  }
});

module.exports = storage;