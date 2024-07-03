
# API JS

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Instalación](#instalación)
4. [Uso](#uso)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Configuración](#configuracion)
6. [Notas Adicionales](#notas-adicionales)

## Introducción

Este proyecto es una API desarrollada en Node.js utilizando Express y MySQL, diseñada para gestionar equipos de computo. Proporciona endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar), autenticación utilizando tokens JWT, y manejo de imágenes para perfiles de usuario.

La API está estructurada con un diseño modular y utiliza Swagger para documentar y exponer sus endpoints de manera clara y accesible. 

## Tecnologías Utilizadas

- Node.js
- Express
- MySQL
- Swagger
- JWT
- Multer

## Instalación

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

- Node.js
- MySQL (u otro sistema de gestión de bases de datos que estés utilizando)

### Pasos de Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/mclguerrero/API-JS.git
   ```

2. Instala las dependencias:


   ```bash
   npm install

   ```

3. Configura la base de datos:
   
   - Crea una base de datos en MySQL.
   - Configura las credenciales de conexión en el archivo `.env`.

4. Iniciar el Proyecto:

   ```bash
   npm run dev
   ```

## Estructura del Proyecto

```
BACKEND_JS/
├── node_modules/
├── src/
│   ├── v1/
│   │   ├── controllers/
│   │   │   └── etc.js
│   │   ├── middlewares/
│   │   │   └── etc.js
│   │   ├── models/ 
│   │   │   └── etc.js 
│   │   ├── routes/
│   │   │   └── etc.js 
│   │   ├── jwtConfig.js 
│   │   ├── multerConfig.js
│   │   └── swaggerConfig.js 
│   ├── app.js 
│   └── db.js 
├── uploads/
│   └── photosProfile/
│       └── icon.jpg
├── .env
├── .gitignore
├── package-lock.json
├── package.json 
└── README.md
```

## Configuración

- Crea un archivo .env en la raíz del proyecto y añade las siguientes variables de entorno:

```bash
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

- Asegúrate de reemplazar your_database_host, your_database_user, your_database_password, your_database_name, y your_jwt_secret con tus configuraciones reales.

## Notas Adicionales

```bash
"scripts": {
   "dev": "node --env-file .env --watch src/app.js"
}
```

```bash
--env-file .env
```

- Especifica el archivo de entorno a usar, permitiendo que tus variables de entorno sean cargadas sin necesidad del paquete dotenv.

```bash
--watch
```

- Permite que Node.js observe cambios en el archivo src/app.js y reinicie el servidor automáticamente, similar a lo que hace nodemon.
