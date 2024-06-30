// app.js

const express = require('express');
const bodyParser = require('body-parser');
const { swaggerDocs } = require('./src/v1/swaggerConfig');
const v1usuariosRouter = require('./src/v1/routes/usuariosRouter');
const v1tiposDocumentosRouter = require('./src/v1/routes/tiposDocumentosRouter');

const { connectToDatabase } = require('./db'); // Importar la función de conexión
const path = require('path');

const app = express();
const port = process.env.PORT || 4000; // Usar el puerto definido en las variables de entorno o 4000 por defecto

// Middleware para parsear el body de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos de fotos de perfil
app.use('/uploads/photosProfile', express.static(path.join(__dirname, 'uploads', 'photosProfile')));

// Conectar a la base de datos al iniciar el servidor
connectToDatabase()
  .then((connection) => {
    // Pasar la conexión a los routers y configuraciones que lo necesiten
    app.locals.db = connection;

    // Usar las rutas de usuarios y tipos de documentos
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

  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Salir del proceso con error
  });
