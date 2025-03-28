const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

// @desc   Register usuario
// @route  POST /api/usuarios/register
// @access Public
// @desc   Register usuario
// @route  POST /api/usuarios/register
// @access Public
const registerUsuario = asyncHandler(async (req, res) => {
    const { nombre, email, contrasena, confirmarContrasena } = req.body;

    // Validar que todos los campos estén completos
    if (!nombre || !email || !contrasena || !confirmarContrasena) {
        res.status(400);
        throw new Error('Todos los campos son obligatorios');
    }

    // Verificar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        res.status(400);
        throw new Error('Las contraseñas no coinciden');
    }

    // Verificar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
        res.status(400);
        throw new Error('El usuario ya existe');
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Crear usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        contrasena: hashedPassword
    });

    if (usuario) {
        res.status(201).json({
            _id: usuario.id,
            nombre: usuario.nombre,
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
    console.log("Datos recibidos en el backend:", req.body); // <-- Agregado para depurar

    const { email, contrasena } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (usuario && (await bcrypt.compare(contrasena, usuario.contrasena))) {
        res.json({
            _id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarToken(usuario.id)
        });
    } else {
        res.status(401);
        throw new Error('Credenciales inválidas');
    }
});

// Función para generar el token JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc   Get usuarios
// @route GET /api/usuarios
// @access Private
const getUsuarios = asyncHandler(async (req, res) => {
    const usuarios = await Usuario.find()
    res.status(200).json(usuarios)
})

// @desc   set usuarios
// @route  POST /api/usuarios
// @access Private
const setUsuario = asyncHandler(async (req, res) => {
    const { nombre, email, contrasena } = req.body;

    // Validación de campos requeridos
    if (!nombre || !email || !contrasena) {
        res.status(400);
        throw new Error('Por favor ingrese nombre, email y contraseña');
    }

    // Creación del usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        contrasena
    });

    res.status(200).json(usuario);
});

// @desc   update usuarios
// @route PUT /api/usuarios/:id
// @access Private
const updateUsuario = asyncHandler(async (req, res) => {
    const usuario = await Usuario.findById(req.params.id)
    if (!usuario) {
        res.status(400)
        throw new Error('usuario not found')
    }

    const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, })
    res.status(200).json(updatedUsuario)
})

// @desc   delete usuarios
// @route DELETE /api/usuarios
// @access Private
const deleteUsuario = asyncHandler(async (req, res) => {
    const usuario = await Usuario.findById(req.params.id)
    if (!usuario) {
        res.status(400)
        throw new Error('usuario not found')
    }

    await usuario.deleteOne()

    res.status(200).json({ id: req.params.id })
})

// @desc   Get usuario
// @route GET /api/usuarios/:id
// @access Private
const getUsuario = asyncHandler(async (req, res) => {
    const usuario = await Usuario.findById(req.params.id)
    res.status(200).json(usuario)
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
