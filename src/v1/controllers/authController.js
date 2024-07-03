// authController.js

const { connectToDatabase } = require('../../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  obtenerUsuarioPorEmail,
  crearUsuario
} = require('../models/usuariosModel');
const jwtConfig = require('../jwtConfig');

const login = async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await obtenerUsuarioPorEmail(email);
    if (!user) {
      console.log('Usuario no encontrado para email:', email);
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    console.log('Contraseña:', pass);
    console.log('Contraseña almacenada:', user.pass);
    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    console.log('Comparación de contraseñas:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const register = async (req, res) => {
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

module.exports = {
  login,
  register
};