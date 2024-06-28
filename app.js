//app.js

const express = require('express');
const bodyParser = require('body-parser');
const { swaggerDocs } = require('./src/v1/swaggerConfig');
const v1usuariosRouter = require('./src/v1/routes/usuariosRouter');
const v1tiposDocumentosRouter = require('./src/v1/routes/tiposDocumentosRouter');

const connection = require('./db');
const path = require('path');
const app = express();
const port = 4000;

// Middleware para parsear el body de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads/photosProfile', express.static(path.join(__dirname, 'uploads', 'photosProfile')));
// Usar las rutas de usuarios
app.use('/api/v1/', v1usuariosRouter);
app.use('/api/v1/', v1tiposDocumentosRouter);

// Iniciar la documentación de Swagger
swaggerDocs(app, port);

// Ruta de prueba para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor corriendo');
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('No encontrado');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación de la API disponible en http://localhost:${port}/api/v1/docs`);
});
