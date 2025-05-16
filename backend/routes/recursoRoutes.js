const express = require('express')
const router = express.Router()
const {getRecursos, getRecursosRandom, setRecurso, updateRecurso, getRecurso, deleteRecurso} = require('../controller/recursoController')

router.route('/').get(getRecursos).post(setRecurso)

router.route('/random').get(getRecursosRandom);

router.route('/:id').get(getRecurso).put(updateRecurso).delete(deleteRecurso)

module.exports = router
