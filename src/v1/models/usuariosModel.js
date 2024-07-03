// usuariosModel.js

const { connectToDatabase } = require('../../db');
const bcrypt = require('bcrypt');

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
const crearUsuario = async (nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo) => {
  let connection;
  try {
    connection = await connectToDatabase();
    const hashedPassword = await bcrypt.hash(pass, 10);
    const insertQuery = 'INSERT INTO usuarios (nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await connection.execute(insertQuery, [nombres, apellidos, tipoDocumento_id, nroDocumento, celular, email, pass, photo, isActivo]);
    return result.insertId;
  } catch (error) {
    throw new Error('Error al crear el usuario:', error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

// Actualizar un usuario por ID
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

// Eliminar un usuario por ID
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
const obtenerUsuarioPorEmail = async (email) => {
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

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorEmail
};