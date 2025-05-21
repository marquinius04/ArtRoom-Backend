const express = require('express');
const router = express.Router();
const { getTiposArchivo, createTipoArchivo, deleteTipoArchivo } = require('../controller/tipoArchivoController');

router.get('/', getTiposArchivo);
router.post('/', createTipoArchivo);
router.delete('/:id', deleteTipoArchivo);

module.exports = router;
