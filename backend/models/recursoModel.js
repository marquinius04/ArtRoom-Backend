const mongoose = require('mongoose');

const recursoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  archivoUrl: { type: String, required: true },
  previewUrl: { type: String },
  tags: { type: String },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  numDescargas: { type: Number, default: 0 },
  descripcion: { type: String },
  numLikes: { type: Number, default: 0 },
  numVistas: { type: Number, default: 0 },
  nombreUsuario: { type: String } // Puedes obtenerlo automáticamente del usuario referenciado si lo prefieres
});

module.exports = mongoose.model('Recurso', recursoSchema);