const express = require('express');
const router = express.Router();
const {
    getUsuarios,
    setUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario,
    registerUsuario,
    loginUsuario
} = require('../controller/usuarioController');  // Asegúrate de que esta línea sea correcta

// Rutas
router.post('/register', registerUsuario);
router.post('/login', loginUsuario);
router.get('/', getUsuarios);
router.post('/', setUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
router.get('/:id', getUsuario);

module.exports = router;
