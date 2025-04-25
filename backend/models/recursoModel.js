const mongoose = require('mongoose')

const recursoSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    description: String,
    previewUrl: String,
    archivoUrl: {
        type: String,
        required: true
    },
    tags: [String],
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoriaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    numDescargas: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Recurso', recursoSchema)