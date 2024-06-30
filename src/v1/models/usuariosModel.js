// usuariosModel.js

const { connectToDatabase } = require('../../../db');
const bcrypt = require('bcrypt');
const fs = require('fs');
const defaultPhoto = 'icon.jpg';

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
  let connection;
  try {
    connection = await connectToDatabase();
    const usuariosQuery = 'SELECT * FROM usuarios';
    const [usuarios] = await connection.execute(usuariosQuery);
    return usuarios;
  } catch (error) {
    throw new Error('Error al obtener todos los usuarios:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (id) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const usuarioQuery = 'SELECT * FROM usuarios WHERE id = ?';
    const [usuario] = await connection.execute(usuarioQuery, [id]);
    return usuario.length ? usuario[0] : null;
  } catch (error) {
    throw new Error('Error al obtener el usuario por ID:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Crear un nuevo usuario
const crearUsuario = async (nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const hashedPassword = await bcrypt.hash(pass, 10);
    const insertQuery = 'INSERT INTO usuarios (nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await connection.execute(insertQuery, [nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, hashedPassword]);
    return result.insertId;
  } catch (error) {
    throw new Error('Error al crear el usuario:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Actualizar un usuario
const actualizarUsuario = async (id, nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const updateQuery = 'UPDATE usuarios SET nombres = ?, apellidos = ?, tipoDocumento_id = ?, nroDocumento = ?, celular = ?, email = ?, pass = ?, photo = ?, isActivo = ? WHERE id = ?';
    await connection.execute(updateQuery, [nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo, id]);
  } catch (error) {
    throw new Error('Error al actualizar el usuario:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Eliminar un usuario
const eliminarUsuario = async (id) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const deleteQuery = 'DELETE FROM usuarios WHERE id = ?';
    await connection.execute(deleteQuery, [id]);
  } catch (error) {
    throw new Error('Error al eliminar el usuario:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Obtener un usuario por correo electrónico
const ObtenerUsuarioPorEmail = async (email) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [results] = await connection.execute(query, [email]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    throw new Error('Error al obtener el usuario por correo electrónico:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};


// FOTO DE PERFIL

// Obtener la foto de perfil de un usuario por ID
const obtenerFotoPerfil = async (id) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const usuarioQuery = 'SELECT photo FROM usuarios WHERE id = ?';
    const [results] = await connection.execute(usuarioQuery, [id]);
    if (results.length === 0) {
      return null;
    }
    return results[0].photo || defaultPhoto;
  } catch (error) {
    throw new Error('Error al obtener la foto de perfil:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Actualizar foto de perfil de un usuario
const actualizarFotoPerfil = async (id, filename) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const usuarioQuery = 'SELECT photo FROM usuarios WHERE id = ?';
    const [usuarioResults] = await connection.execute(usuarioQuery, [id]);
    if (usuarioResults.length === 0) {
      throw new Error('Usuario no encontrado');
    }
    const usuario = usuarioResults[0];

    // Obtener la ruta de la foto anterior del usuario si no es la predeterminada
    if (usuario.photo && usuario.photo !== defaultPhoto) {
      const oldPhotoPath = path.join(__dirname, '..', '..', '..', 'uploads', 'photosProfile', usuario.photo);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath); // Eliminar la foto anterior del servidor
      }
    }

    // Actualizar la foto de perfil en la base de datos
    const updateQuery = 'UPDATE usuarios SET photo = ? WHERE id = ?';
    await connection.execute(updateQuery, [filename, id]);
  } catch (error) {
    throw new Error('Error al actualizar la foto de perfil:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Eliminar la foto de perfil de un usuario por ID
const eliminarFotoPerfil = async (id) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const usuarioQuery = 'SELECT photo FROM usuarios WHERE id = ?';
    const [usuarioResults] = await connection.execute(usuarioQuery, [id]);
    if (usuarioResults.length === 0) {
      throw new Error('Usuario no encontrado');
    }
    const usuario = usuarioResults[0];

    // Si la foto actual no es la predeterminada, eliminarla del servidor
    if (usuario.photo && usuario.photo !== defaultPhoto) {
      const photoPath = path.join(__dirname, '..', '..', '..', 'uploads', 'photosProfile', usuario.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    // Actualizar la base de datos para establecer la foto por defecto
    const updateQuery = 'UPDATE usuarios SET photo = ? WHERE id = ?';
    await connection.execute(updateQuery, [defaultPhoto, id]);
  } catch (error) {
    throw new Error('Error al eliminar la foto de perfil:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  ObtenerUsuarioPorEmail,
  obtenerFotoPerfil,
  actualizarFotoPerfil,
  eliminarFotoPerfil
};
