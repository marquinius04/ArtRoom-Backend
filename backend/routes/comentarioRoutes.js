const express = require('express')
const router = express.Router()
const {
  getComentarios,
  setComentario,
  updateComentario,
  getComentario,
  deleteComentario,
  getComentariosPorRecurso
} = require('../controller/comentarioController')

// ✅ Ruta más específica primero
router.route('/recurso/:id').get(getComentariosPorRecurso)

router.route('/').get(getComentarios).post(setComentario)

router.route('/:id').get(getComentario).put(updateComentario).delete(deleteComentario)

module.exports = router
