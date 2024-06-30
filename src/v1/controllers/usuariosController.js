// usuariosController.js

const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const { connectToDatabase } = require('../../../db');
const bcrypt = require('bcrypt');
const { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario, obtenerFotoPerfil, actualizarFotoPerfil, eliminarFotoPerfil } = require('../models/usuariosModel'); // Importar funciones del modelo

const defaultPhoto = 'icon.jpg';

// Obtener todos los usuarios
const obtenerUsuariosController = async (req, res) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorIdController = async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await connectToDatabase();
    const usuario = await obtenerUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Crear un nuevo usuario
const crearUsuarioController = async (req, res) => {
  const { nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass } = req.body;
  let connection;
  try {
    connection = await connectToDatabase();
    const hashedPassword = await bcrypt.hash(pass, 10);
    const userId = await crearUsuario(nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, hashedPassword);
    res.status(201).json({ message: 'Usuario creado correctamente', id: userId });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Actualizar un usuario
const actualizarUsuarioController = async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo } = req.body;
  let connection;
  try {
    connection = await connectToDatabase();
    await actualizarUsuario(id, nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo);
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Eliminar un usuario
const eliminarUsuarioController = async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await connectToDatabase();
    await eliminarUsuario(id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Obtener la foto de perfil de un usuario por ID
const obtenerFotoPerfilController = async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await connectToDatabase();
    const photoPath = await obtenerFotoPerfil(id);
    const photoURL = `${req.protocol}://${req.get('host')}/uploads/photosProfile/${photoPath}`;
    res.redirect(photoURL);
  } catch (error) {
    console.error('Error al obtener la foto de perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Actualizar foto de perfil de un usuario
const actualizarFotoPerfilController = async (req, res) => {
  const { id } = req.params;
  const photo = req.file;
  let connection;
  try {
    connection = await connectToDatabase();
    await actualizarFotoPerfil(id, photo.filename);
    res.status(200).json({ message: 'Foto de perfil actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la foto de perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Eliminar foto de perfil de un usuario
const eliminarFotoPerfilController = async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await connectToDatabase();
    await eliminarFotoPerfil(id);
    res.status(200).json({ message: 'Foto de perfil eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la foto de perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

module.exports = {
  obtenerUsuariosController,
  obtenerUsuarioPorIdController,
  crearUsuarioController,
  actualizarUsuarioController,
  eliminarUsuarioController,
  obtenerFotoPerfilController,
  actualizarFotoPerfilController,
  eliminarFotoPerfilController
};
