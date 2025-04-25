const asyncHandler = require('express-async-handler')

const HistorialDescarga = require('../models/historialDescargaModel')

// @desc   Get historialDescargas
// @route GET /api/historialDescargas
// @access Private
const getHistorialDescargas = asyncHandler(async (req, res) => {
    try {
        const historial = await HistorialDescarga.find().populate('idUsuario').populate('idRecurso')
        res.json(historial)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// @desc   set historialDescargas
// @route POST /api/historialDescargas
// @access Private
const setHistorialDescarga = asyncHandler(async (req, res) => {
    try {
        const nuevaDescarga = new HistorialDescarga(req.body)
        const guardada = await nuevaDescarga.save()
        res.status(201).json(guardada)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// @desc   update historialDescargas
// @route PUT /api/historialDescargas/:id
// @access Private
const updateHistorialDescarga = asyncHandler( async (req, res) => {
    try {
        const actualizado = await HistorialDescarga.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(actualizado)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    
})

// @desc   delete historialDescargas
// @route DELETE /api/historialDescargas
// @access Private
const deleteHistorialDescarga = asyncHandler(async (req, res) => {
    try {
        await HistorialDescarga.findByIdAndDelete(req.params.id)
        res.json({ message: 'Historial eliminado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// @desc   Get HistorialDescarga
// @route GET /api/historialDescargas/:id
// @access Private
const getHistorialDescarga = asyncHandler(async (req, res) => {
    try {
        const descarga = await HistorialDescarga.findById(req.params.id).populate('idUsuario').populate('idRecurso')
        if (!descarga) return res.status(404).json({ message: 'Historial no encontrado' })
        res.json(descarga)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = {
    getHistorialDescargas,
    setHistorialDescarga,
    updateHistorialDescarga,
    deleteHistorialDescarga,
    getHistorialDescarga
}