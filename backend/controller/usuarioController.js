const asyncHandler = require('express-async-handler')

const Usuario = require('../models/usuarioModel')


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
const updateUsuario = asyncHandler( async (req, res) => {
    const usuario = await Usuario.findById(req.params.id)
    if(!usuario){
        res.status(400)
        throw new Error('usuario not found')
    }

    const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json(updatedUsuario)
})


// @desc   delete usuarios
// @route DELETE /api/usuarios
// @access Private
const deleteUsuario = asyncHandler(async (req, res) => {
    const usuario = await Usuario.findById(req.params.id)
    if(!usuario){
        res.status(400)
        throw new Error('usuario not found')
    }

    await usuario.deleteOne()

    res.status(200).json({id: req.params.id})
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
    getUsuario
}