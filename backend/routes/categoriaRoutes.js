const express = require('express')
const router = express.Router()
const {getCategorias, setCategoria, updateCategoria, getCategoria, deleteCategoria} = require('../controller/categoriaContoller')

router.route('/').get(getCategorias).post(setCategoria)

router.route('/:id').get(getCategoria).put(updateCategoria).delete(deleteCategoria)

module.exports = router
