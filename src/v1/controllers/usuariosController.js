// usuariosController.js

const { connectToDatabase } = require('../../db');
const bcrypt = require('bcrypt');
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require('../models/usuariosModel');

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

const crearUsuarioController = async (req, res) => {
  const { nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass } = req.body;

  let connection;
  try {
    connection = await connectToDatabase();
    const hashedPassword = await bcrypt.hash(pass, 10);

    const defaultPhoto = 'icon.jpg';
    const defaultIsActivo = 1;

    const userId = await crearUsuario(nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, hashedPassword, defaultPhoto, defaultIsActivo);

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

module.exports = {
  obtenerUsuariosController,
  obtenerUsuarioPorIdController,
  crearUsuarioController,
  actualizarUsuarioController,
  eliminarUsuarioController
};