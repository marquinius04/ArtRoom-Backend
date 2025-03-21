const express = require('express')
const router = express.Router()
const {getUsuarios, setUsuario, updateUsuario, getUsuario, deleteUsuario} = require('../controller/usuarioController')

router.route('/').get(getUsuarios).post(setUsuario)

router.route('/:id').get(getUsuario).put(updateUsuario).delete(deleteUsuario)

module.exports = router
