//usuarioModel.js 

const connection = require('../../../db');
const bcrypt = require('bcrypt');
const defaultPhoto = 'icon.jpg';
const path = require('path');
const fs = require('fs');
// Función para obtener todos los usuarios
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM usuarios', (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Función para obtener un usuario por ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0]);
    });
  });
};

// Función para crear un nuevo usuario
const createUser = async (userData) => {
  const { nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, isActivo } = userData;
  const hashedPassword = await bcrypt.hash(pass, 10);
  const photo = userData.photo || defaultPhoto; // Asignar imagen por defecto si no se proporciona ninguna

  const query = 'INSERT INTO usuarios (nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  return new Promise((resolve, reject) => {
    connection.query(query, [nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, hashedPassword, photo, isActivo], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve({ id: results.insertId });
    });
  });
};

// Función para actualizar un usuario por ID
const updateUser = (id, userData) => {
  const { nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo } = userData;
  const query = 'UPDATE usuarios SET nombres = ?, apellidos = ?, tipoDocumento_id = ?, nroDocumento = ?, celular = ?, email = ?, pass = ?, photo = ?, isActivo = ? WHERE id = ?';

  return new Promise((resolve, reject) => {
    connection.query(query, [nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo, id], (error) => {
      if (error) {
        return reject(error);
      }
      resolve({ message: 'Usuario actualizado' });
    });
  });
};

// Función para eliminar un usuario por ID
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error) => {
      if (error) {
        return reject(error);
      }
      resolve({ message: 'Usuario eliminado' });
    });
  });
};

// FOTO DE PERFIL

// Función para obtener la foto de perfil de un usuario por ID
const getProfilePhoto = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT photo FROM usuarios WHERE id = ?', [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length > 0) {
        resolve(results[0].photo || defaultPhoto); // Devolver la foto o la imagen por defecto si no hay foto
      } else {
        reject('Usuario no encontrado');
      }
    });
  });
};

// Función para actualizar la foto de perfil de un usuario por ID
const updateProfilePhoto = (id, photoUrl) => {
  const photo = photoUrl || defaultPhoto; // Asignar imagen por defecto si no se proporciona ninguna

  return new Promise((resolve, reject) => {
    connection.query('UPDATE usuarios SET photo = ? WHERE id = ?', [photo, id], (error) => {
      if (error) {
        return reject(error);
      }
      resolve({ message: 'Foto de perfil actualizada' });
    });
  });
};

// Función para eliminar la foto de perfil de un usuario por ID
const deleteProfilePhoto = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE usuarios SET photo = ? WHERE id = ?', [defaultPhoto, id], (error) => {
      if (error) {
        return reject(error);
      }
      resolve({ message: 'Foto de perfil eliminada, se restauró la imagen por defecto' });
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfilePhoto,
  updateProfilePhoto,
  deleteProfilePhoto
};
