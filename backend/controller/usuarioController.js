const asyncHandler = require('express-async-handler')

const Usuario = require('../models/usuarioModel')

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
// @route POST /api/usuarios
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
    getUsuario
}