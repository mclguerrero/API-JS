//usuariosController.js

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateProfilePhoto,
  deleteProfilePhoto
} = require('../models/usuariosModel');

const { upload } = require('../middlewares/usuariosMiddlewar');
const multer = require('multer');
const defaultPhoto = 'icon.jpg';
const path = require('path');
const fs = require('fs');
// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await getAllUsers();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await getUserById(id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Actualizar un usuario por ID
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await updateUser(id, req.body);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Eliminar un usuario por ID
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await deleteUser(id);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// FOTO DE PERFIL

// Obtener la foto de perfil de un usuario por ID
const obtenerFotoPerfil = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await getUserById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const photoPath = usuario.photo || defaultPhoto;
    const photoURL = `${req.protocol}://${req.get('host')}/uploads/photosProfile/${photoPath}`;

    res.redirect(photoURL);
  } catch (error) {
    res.status(500).json({ error });
  }
};
// Actualizar foto de perfil de un usuario
const actualizarFotoPerfil = async (req, res) => {
  const { id } = req.params;
  const photo = req.file;

  try {
    // Verificar que el usuario exista antes de actualizar la foto de perfil
    const usuario = await getUserById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener la ruta de la foto anterior del usuario si no es la predeterminada
    if (usuario.photo && usuario.photo !== defaultPhoto) {
      const oldPhotoPath = path.join(__dirname, '..', '..', '..', 'uploads', 'photosProfile', usuario.photo);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath); // Eliminar la foto anterior del servidor
      }
    }

    // Actualizar la foto de perfil en la base de datos
    await updateProfilePhoto(id, photo.filename);

    res.status(200).json({ message: 'Foto de perfil actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la foto de perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};// Eliminar la foto de perfil de un usuario por ID
const eliminarFotoPerfil = async (req, res) => {
  const { id } = req.params;
  try {
    // Obtener el nombre de la foto actual del usuario
    const usuario = await getUserById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si la foto actual no es la predeterminada, eliminarla del servidor
    if (usuario.photo && usuario.photo !== defaultPhoto) {
      const photoPath = path.join(__dirname, '..', '..', '..', 'uploads', 'photosProfile', usuario.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    // Actualizar la base de datos para establecer la foto por defecto
    await deleteProfilePhoto(id);

    res.status(200).json({ message: 'Foto de perfil eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la foto de perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};


module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerFotoPerfil,
  actualizarFotoPerfil,
  eliminarFotoPerfil
};
