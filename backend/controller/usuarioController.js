const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

// Función para generar el token JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc   Register usuario
// @route  POST /api/usuarios/register
// @access Public
const registerUsuario = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Todos los campos son obligatorios');
    }

    // Verificar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
        res.status(400);
        throw new Error('El usuario ya existe');
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const usuario = await Usuario.create({
        username,
        email,
        password: hashedPassword
    });

    if (usuario) {
        res.status(201).json({
            _id: usuario.id,
            username: usuario.username,
            email: usuario.email,
            token: generarToken(usuario.id)
        });
    } else {
        res.status(400);
        throw new Error('No se pudo registrar el usuario');
    }
});

// @desc   Login usuario
// @route  POST /api/usuarios/login
// @access Public
const loginUsuario = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (usuario && (await bcrypt.compare(password, usuario.password))) {
        res.json({
            _id: usuario.id,
            username: usuario.username,
            email: usuario.email,
            token: generarToken(usuario.id)
        });
    } else {
        res.status(401);
        throw new Error('Credenciales inválidas');
    }
});

// @desc   Get usuarios
// @route GET /api/usuarios
// @access Private
const getUsuarios = asyncHandler(async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// @desc   set usuarios
// @route  POST /api/usuarios
// @access Private
const setUsuario = asyncHandler(async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body)
        const usuarioGuardado = await nuevoUsuario.save()
        res.status(201).json(usuarioGuardado)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @desc   update usuarios
// @route PUT /api/usuarios/:id
// @access Private
const updateUsuario = asyncHandler( async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(usuarioActualizado)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @desc   delete usuarios
// @route DELETE /api/usuarios
// @access Private
const deleteUsuario = asyncHandler(async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id)
        res.json({ message: 'Usuario eliminado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// @desc   Get usuario
// @route GET /api/usuarios/:id
// @access Private
const getUsuario = asyncHandler(async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' })
        res.json(usuario)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = {
    getUsuarios,
    setUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario,
    registerUsuario,
    loginUsuario
}
