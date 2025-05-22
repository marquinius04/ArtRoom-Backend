const mongoose = require('mongoose');

const tipoArchivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('TipoArchivo', tipoArchivoSchema);
