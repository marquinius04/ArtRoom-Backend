const mongoose = require('mongoose')

const commentarioSchema = mongoose.Schema({
    recursoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recurso',
        required: true
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    texto: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Comentario', commentarioSchema)
