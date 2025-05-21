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
    console.log("Body recibido:", req.body);
  const { titulo, descripcion, archivoUrl, thumbnailUrl, tags, usuarioId } = req.body;

  if (!archivoUrl || !usuarioId) {
    return res.status(400).json({ message: "archivoUrl y usuarioId son obligatorios." });
  }

  const nuevoRecurso = new Recurso({
    titulo,
    descripcion,
    archivoUrl,
    previewUrl: thumbnailUrl, // Aquí mapeas correctamente el nombre desde el frontend
    tags,
    usuarioId,
  });

  try {
    const recursoGuardado = await nuevoRecurso.save();
    console.log("Recurso guardado:", recursoGuardado);
    res.status(201).json({ success: true, recurso: recursoGuardado });
  } catch (err) {
    console.error("Error al guardar el recurso:", err);
    res.status(400).json({ message: err.message });
  }
});


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