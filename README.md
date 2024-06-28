
# API JS

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Instalación](#instalación)
4. [Uso](#uso)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Contribución](#contribución)
7. [Licencia](#licencia)

## Introducción

Este proyecto es una API desarrollada en Node.js utilizando Express y MySQL, diseñada para gestionar equipos de computo. Proporciona endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar), autenticación utilizando tokens JWT, y manejo de imágenes para perfiles de usuario.

La API está estructurada con un diseño modular y utiliza Swagger para documentar y exponer sus endpoints de manera clara y accesible. 

## Tecnologías Utilizadas

- Node.js
- Express
- MySQL
- Swagger


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
   npm init -y
   ```

3. Configura la base de datos:
   
   - Crea una base de datos en MySQL.
   - Configura las credenciales de conexión en el archivo `db.js`.

4. Inicia la aplicación:

   ```bash
   npm app.js
   ```

## Uso

Explica cómo utilizar la aplicación, ejemplos de endpoints API, etc.

## Estructura del Proyecto

Describe la estructura de carpetas y archivos del proyecto:

```
backend_js/
├── node_modules/
├── src/
│   ├── v1/
│   │  ├── controllers/
│   │  ├── middlewares/
│   │  ├── models/
│   │  ├── routers/
│   ├── swaggerConfig.js
├── uploads/
│   ├── photosProfile/  
├── app.js
├── db.js
├── package-lock.json
├── package.json

```

