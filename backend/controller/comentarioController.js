const asyncHandler = require('express-async-handler')

const Comentario = require('../models/comentarioModel')

// @desc   Get comentarios
// @route GET /api/comentarios
// @access Private
const getComentarios = asyncHandler(async (req, res) => {
    try {
      const comentarios = await Comentario.find({ recursoId: { $ne: null } }) // solo comentarios válidos
        .populate('usuarioId', 'username')  // solo username del usuario
        .populate('recursoId', 'titulo');   // solo título del recurso
  
      res.json(comentarios);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Nueva ruta: GET /api/comentarios/recurso/:id
const getComentariosPorRecurso = asyncHandler(async (req, res) => {
    try {
      const comentarios = await Comentario.find({ recursoId: req.params.id })
        .populate('usuarioId', 'username')
        .populate('recursoId', 'titulo');
      res.json(comentarios);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  

// @desc   set comentarios
// @route POST /api/comentarios
// @access Private
const setComentario = asyncHandler(async (req, res) => {
    const { texto, recursoId, usuarioId } = req.body;
  
    if (!texto || !recursoId || !usuarioId) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
  
    try {
      const nuevoComentario = new Comentario({
        texto,
        recursoId,
        usuarioId,
      });
  
      const comentarioGuardado = await nuevoComentario.save();
  
      // Corrección: volver a buscar y poblar correctamente
      const comentarioCompleto = await Comentario.findById(comentarioGuardado._id)
        .populate("usuarioId", "username")
        .populate("recursoId", "titulo");
  
      res.status(201).json(comentarioCompleto);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  

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
    getComentario,
    getComentariosPorRecurso
}