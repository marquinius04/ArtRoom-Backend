const asyncHandler = require('express-async-handler');
const TipoArchivo = require('../models/tipoArchivoModel');

// GET /api/tipos
const getTiposArchivo = asyncHandler(async (req, res) => {
    const tipos = await TipoArchivo.find();
    res.json(tipos);
});

// POST /api/tipos
const createTipoArchivo = asyncHandler(async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        res.status(400);
        throw new Error('El nombre es obligatorio');
    }

    const tipoArchivo = new TipoArchivo({ nombre });

    const createdTipoArchivo = await tipoArchivo.save();
    res.status(201).json(createdTipoArchivo);
});

// DELETE /api/tipos/:id
const deleteTipoArchivo = asyncHandler(async (req, res) => {
    try {
        await TipoArchivo.findByIdAndDelete(req.params.id)
        res.json({ message: 'Recurso eliminado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = {
    getTiposArchivo,
    createTipoArchivo,
    deleteTipoArchivo
};