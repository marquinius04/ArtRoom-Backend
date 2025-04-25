const express = require('express')
const router = express.Router()
const {getComentarios, setComentario, updateComentario, getComentario, deleteComentario} = require('../controller/comentarioController')

router.route('/').get(getComentarios).post(setComentario)

router.route('/:id').get(getComentario).put(updateComentario).delete(deleteComentario)

module.exports = router
