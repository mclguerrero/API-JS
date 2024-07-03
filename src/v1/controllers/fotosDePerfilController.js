// usuariosController.js

const { connectToDatabase } = require('../../db');
const {
    obtenerFotoPerfil,
    actualizarFotoPerfil,
    eliminarFotoPerfil
} = require('../models/fotosDePerfilModel');

// FOTOS

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

// Actualizar foto de perfil de un usuario por ID
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

// Eliminar foto de perfil de un usuario por ID
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
    obtenerFotoPerfilController,
    actualizarFotoPerfilController,
    eliminarFotoPerfilController
};