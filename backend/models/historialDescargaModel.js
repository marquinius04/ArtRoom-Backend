const mongoose = require('mongoose')

const historialDescargaSchema = mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    recursoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recurso',
        required: true
    }
}, {
    timestamps: true 
})

module.exports = mongoose.model('HistorialDescarga', historialDescargaSchema)
