const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Información básica sobre la API
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API JS',
    },
  },
  apis: ['./src/v1/routes/*.js'], // Rutas a los archivos de rutas para la documentación
};

// Documentación en formato JSON
const swaggerSpec = swaggerJSDoc(options);

// Función para configurar nuestra documentación
const swaggerDocs = (app, port) => {
  // Ruta para acceder a la documentación
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentación en formato JSON disponible
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Version 1 Docs are available on http://localhost:${port}/api/v1/docs`);
};

module.exports = { swaggerDocs };
