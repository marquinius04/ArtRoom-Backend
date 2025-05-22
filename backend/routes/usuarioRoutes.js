const express = require('express');
const router = express.Router();
const {
    getUsuarios,
    setUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario,
    registerUsuario,
    loginUsuario,
    registrarDescarga,
    borrarDescarga
} = require('../controller/usuarioController');  // Asegúrate de que esta línea sea correcta

// Rutas
router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/register', registerUsuario);
router.post('/login', loginUsuario);
router.post('/', setUsuario);
router.post('/:id/descargar/:assetId', registrarDescarga);
router.put('/:id', updateUsuario);
router.delete("/delete-account/:id", deleteUsuario);
router.delete('/:id/descargar/:assetId', borrarDescarga);


module.exports = router;
