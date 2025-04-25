const express = require('express')
const router = express.Router()
const {getHistorialDescargas, setHistorialDescarga, updateHistorialDescarga, getHistorialDescarga, deleteHistorialDescarga} = require('../controller/historialDescargaController')

router.route('/').get(getHistorialDescargas).post(setHistorialDescarga)

router.route('/:id').get(getHistorialDescarga).put(updateHistorialDescarga).delete(deleteHistorialDescarga)

module.exports = router
