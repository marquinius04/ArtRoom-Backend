const asyncHandler = require('express-async-handler')

const Comentario = require('../models/comentarioModel')

// @desc   Get comentarios
// @route GET /api/comentarios
// @access Private
const getComentarios = asyncHandler(async (req, res) => {
    try {
        const comentarios = await Comentario.find().populate('usuarioId').populate('recursoId')
        res.json(comentarios)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// @desc   set comentarios
// @route POST /api/comentarios
// @access Private
const setComentario = asyncHandler(async (req, res) => {
    try {
        const nuevoComentario = new Comentario(req.body)
        const comentarioGuardado = await nuevoComentario.save()
        res.status(201).json(comentarioGuardado)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @desc   update comentarios
// @route PUT /api/comentarios/:id
// @access Private
const updateComentario = asyncHandler( async (req, res) => {
    try {
        const comentarioActualizado = await Comentario.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(comentarioActualizado)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @desc   delete comentarios
// @route DELETE /api/comentarios
// @access Private
const deleteComentario = asyncHandler(async (req, res) => {
    try {
        await Comentario.findByIdAndDelete(req.params.id)
        res.json({ message: 'Comentario eliminado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// @desc   Get Comentario
// @route GET /api/comentarios/:id
// @access Private
const getComentario = asyncHandler(async (req, res) => {
    try {
        const comentario = await Comentario.findById(req.params.id).populate('usuarioId').populate('recursoId')
        if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' })
        res.json(comentario)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = {
    getComentarios,
    setComentario,
    updateComentario,
    deleteComentario,
    getComentario
}