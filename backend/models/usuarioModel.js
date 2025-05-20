const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String
    },
    bio: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    socialLinks: {
        type: [
            {
                type: { type: String, required: true }, // ej: "instagram", "twitter"
                url: { type: String, required: true }   // ej: "https://instagram.com/..."
            }
        ],
        default: []
    }
         
}, {
    timestamps: true
})

module.exports = mongoose.model('Usuario', usuarioSchema)
