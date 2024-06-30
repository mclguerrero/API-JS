// authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ObtenerUsuarioPorEmail } = require('../models/usuariosModel');
const jwtConfig = require('../jwtConfig');

const login = async (req, res) => {
  const { email, pass } = req.body;
  
  try {
    const user = await ObtenerUsuarioPorEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  login,
};
