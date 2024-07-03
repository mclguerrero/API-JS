// fotosDePerfilModel.js

const { connectToDatabase } = require('../../db');
const fs = require('fs');
const defaultPhoto = 'icon.jpg';

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

// Actualizar foto de perfil de un usuario por ID
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
    obtenerFotoPerfil,
    actualizarFotoPerfil,
    eliminarFotoPerfil
};