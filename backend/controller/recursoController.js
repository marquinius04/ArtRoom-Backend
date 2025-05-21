const asyncHandler = require('express-async-handler')

const Recurso = require('../models/recursoModel')

// @desc   Get recursos
// @route GET /api/recursos
// @access Private
const getRecursos = asyncHandler(async (req, res) => {
    try {
        const recursos = await Recurso.find().populate('usuarioId')
        res.json(recursos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Registrar vista (solo si no existe ya)
const addView = asyncHandler(async (req, res) => {
    const recurso = await Recurso.findById(req.params.id);
    if (!recurso) return res.status(404).json({ message: "Recurso no encontrado" });
  
    const userId = req.body.userId; // Recibimos el id del usuario que ve
  
    if (!userId) return res.status(400).json({ message: "UserId requerido" });
  
    // Si usuario no está en usuariosVistos, añadimos
    if (!recurso.usuariosVistos.includes(userId)) {
      recurso.usuariosVistos.push(userId);
      recurso.numVistas = recurso.usuariosVistos.length;
      await recurso.save();
    }
  
    res.json({ numVistas: recurso.numVistas });
  });
  
  // Toggle like
  const toggleLike = asyncHandler(async (req, res) => {
    const recurso = await Recurso.findById(req.params.id);
    if (!recurso) return res.status(404).json({ message: "Recurso no encontrado" });
  
    const userId = req.body.userId; // Id del usuario que da like
  
    if (!userId) return res.status(400).json({ message: "UserId requerido" });
  
    const index = recurso.usuariosLikes.indexOf(userId);
    if (index === -1) {
      // Usuario no ha dado like, añadirlo
      recurso.usuariosLikes.push(userId);
    } else {
      // Usuario ya dio like, quitarlo (toggle)
      recurso.usuariosLikes.splice(index, 1);
    }
    recurso.numLikes = recurso.usuariosLikes.length;
    await recurso.save();
  
    res.json({ numLikes: recurso.numLikes, liked: index === -1 });
  });
  

// @desc   Get recursos aleatorios
// @route GET /api/recursos/random
// @access Public
const getRecursosRandom = asyncHandler(async (req, res) => {
    try {
        const recursosAleatorios = await Recurso.aggregate([{ $sample: { size: 3 } }]); // Selecciona 3 recursos aleatorios
        res.json(recursosAleatorios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc   set recursos
// @route POST /api/recursos
// @access Private
const setRecurso = asyncHandler(async (req, res) => {
    try {
        const { archivoUrl, previewUrl, ...resto } = req.body;

        const nuevoRecurso = new Recurso({
            ...resto,
            archivoUrl,
            previewUrl
        });

        const recursoGuardado = await nuevoRecurso.save();
        res.status(201).json(recursoGuardado);
    } catch (err) {
        console.error(err);
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
        const recurso = await Recurso.findById(req.params.id).populate('usuarioId')
        if (!recurso) return res.status(404).json({ message: 'Recurso no encontrado' })
        res.json(recurso)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = {
    getRecursos,
    getRecursosRandom,
    setRecurso,
    updateRecurso,
    deleteRecurso,
    getRecurso,
    addView,
    toggleLike
}