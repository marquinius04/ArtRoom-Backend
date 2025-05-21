const express = require('express')
const router = express.Router()
const {getRecursos, getRecursosRandom, setRecurso, updateRecurso, getRecurso, deleteRecurso, addView, toggleLike, getRecursosPorUsuario} = require('../controller/recursoController')

router.route('/').get(getRecursos).post(setRecurso)

router.get('/usuario/:usuarioId', getRecursosPorUsuario);

router.route('/random').get(getRecursosRandom);

router.route('/:id').get(getRecurso).put(updateRecurso).delete(deleteRecurso)

router.post('/:id/view', addView);

router.post('/:id/like', toggleLike);

module.exports = router
