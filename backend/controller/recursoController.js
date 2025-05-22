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

// @desc   Get recursos por usuario
// @route  GET /api/recursos/usuario/:usuarioId
// @access Private
const getRecursosPorUsuario = asyncHandler(async (req, res) => {
  try {
    const { usuarioId } = req.params;

    // Busca los recursos que coincidan con el usuarioId
    const recursos = await Recurso.find({ usuarioId }).populate('usuarioId');

    if (!recursos || recursos.length === 0) {
      return res.status(404).json({ message: "No se encontraron recursos para este usuario." });
    }

    res.json(recursos);
  } catch (err) {
    console.error("Error al obtener recursos por usuario:", err);
    res.status(500).json({ message: err.message });
  }
});

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
  
    resres.json({
        numLikes: recurso.numLikes,
        liked: index === -1,
        usuariosLikes: recurso.usuariosLikes
      });
      
  });
  

// @desc   Get recursos aleatorios
// @route GET /api/recursos/random
// @access Public
const getRecursosRandom = asyncHandler(async (req, res) => {
  try {
    const total = await Recurso.countDocuments();
    const size = Math.min(3, total);
    const recursosAleatorios = await Recurso.aggregate([{ $sample: { size } }]);

    // Populate usuarioId to include username
    const populatedRecursos = await Recurso.populate(recursosAleatorios, {
      path: 'usuarioId',
      select: 'username', // Only include the username field
    });

    res.json(populatedRecursos);
  } catch (err) {
    console.error("Error en getRecursosRandom:", err);
    res.status(500).json({ message: err.message });
  }
});

// @desc   set recursos
// @route POST /api/recursos
// @access Private
const setRecurso = asyncHandler(async (req, res) => {
  console.log("Body recibido:", req.body);
  const { titulo, descripcion, archivoUrl, thumbnailUrl, tags, usuarioId, tipo } = req.body;

  // Validar campos obligatorios
  if (!archivoUrl || !usuarioId || !tipo) {
    return res.status(400).json({ message: "archivoUrl, usuarioId y tipo son obligatorios." });
  }

  const nuevoRecurso = new Recurso({
    titulo,
    descripcion,
    archivoUrl,
    previewUrl: thumbnailUrl, // Aquí mapeas correctamente el nombre desde el frontend
    tags,
    usuarioId,
    tipo, // Incluye el tipo en el nuevo recurso
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
  toggleLike,
  getRecursosPorUsuario, // Exporta la nueva función
};