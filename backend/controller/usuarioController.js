const asyncHandler = require('express-async-handler')

const usuario = require('../models/usuarioModel')

// @desc   Get usuarios
// @route GET /api/usuarios
// @access Private
const getUsuarios = asyncHandler(async (req, res) => {
    const usuarios = await usuario.find()
    res.status(200).json(usuarios)
})

// @desc   set usuarios
// @route POST /api/usuarios
// @access Private
const setUsuario = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Por favor ingrese datos para añadir')
    }

    const usuario = await usuario.create({
        text: req.body.text
    })
    res.status(200).json(usuario)
})

// @desc   update usuarios
// @route PUT /api/usuarios/:id
// @access Private
const updateUsuario = asyncHandler( async (req, res) => {
    const usuario = await usuario.findById(req.params.id)
    if(!usuario){
        res.status(400)
        throw new Error('usuario not found')
    }

    const updatedUsuario = await usuario.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json(updatedUsuario)
})

// @desc   delete usuarios
// @route DELETE /api/usuarios
// @access Private
const deleteUsuario = asyncHandler(async (req, res) => {
    const usuario = await usuario.findById(req.params.id)
    if(!usuario){
        res.status(400)
        throw new Error('usuario not found')
    }

    await usuario.remove()

    res.status(200).json({id: req.params.id})
})

// @desc   Get usuario
// @route GET /api/usuarios/:id
// @access Private
const getUsuario = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get usuario id: ${req.params.id}`})
})

module.exports = {
    getUsuarios,
    setUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario
}