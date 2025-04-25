const asyncHandler = require('express-async-handler')

const Recurso = require('../models/recursoModel')

// @desc   Get recursos
// @route GET /api/recursos
// @access Private
const getRecursos = asyncHandler(async (req, res) => {
    try {
        const recursos = await Recurso.find().populate('usuarioId').populate('categoriaId')
        res.json(recursos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// @desc   set recursos
// @route POST /api/recursos
// @access Private
const setRecurso = asyncHandler(async (req, res) => {
    try {
        const nuevoRecurso = new Recurso(req.body)
        const recursoGuardado = await nuevoRecurso.save()
        res.status(201).json(recursoGuardado)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @desc   update recursos
// @route PUT /api/recursos/:id
// @access Private
const updateRecurso = asyncHandler( async (req, res) => {
    try {
        const recursoActualizado = await Recurso.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(recursoActualizado)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @desc   delete recursos
// @route DELETE /api/recursos
// @access Private
const deleteRecurso = asyncHandler(async (req, res) => {
    try {
        await Recurso.findByIdAndDelete(req.params.id)
        res.json({ message: 'Recurso eliminado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// @desc   Get recurso
// @route GET /api/recursos/:id
// @access Private
const getRecurso = asyncHandler(async (req, res) => {
    try {
        const recurso = await Recurso.findById(req.params.id).populate('usuarioId').populate('categoriaId')
        if (!recurso) return res.status(404).json({ message: 'Recurso no encontrado' })
        res.json(recurso)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = {
    getRecursos,
    setRecurso,
    updateRecurso,
    deleteRecurso,
    getRecurso
}