const asyncHandler = require('express-async-handler')

const Recurso = require('../models/recursoModel')

// @desc   Get recursos
// @route GET /api/recursos
// @access Private
const getRecursos = asyncHandler(async (req, res) => {
    try {
        const recursos = await Recurso.find().populate('usuarioId').populate('categoriaId')
        res.json(recursos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// @desc   set recursos
// @route POST /api/recursos
// @access Private
const setRecurso = asyncHandler(async (req, res) => {
    const { Dropbox } = require('dropbox');
    const fetch = require('isomorphic-fetch'); // requerido por el SDK de Dropbox
    
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });
    
    try {
        const { archivo, preview, ...resto } = req.body;
    
        // Simulamos que los archivos vienen como base64 o buffer
        const archivoBuffer = Buffer.from(archivo.data, 'base64');
        const previewBuffer = preview ? Buffer.from(preview.data, 'base64') : null;
    
        const dropboxArchivo = await dbx.filesUpload({
            path: `/archivos/${archivo.nombre}`,
            contents: archivoBuffer,
            mode: 'add',
            autorename: true
        });
    
        let dropboxPreview;
        if (previewBuffer) {
            dropboxPreview = await dbx.filesUpload({
                path: `/previews/${preview.nombre}`,
                contents: previewBuffer,
                mode: 'add',
                autorename: true
            });
        }
    
        // Obtener URLs públicas
        const sharedArchivo = await dbx.sharingCreateSharedLinkWithSettings({ path: dropboxArchivo.result.path_lower });
        const archivoUrl = sharedArchivo.result.url.replace('?dl=0', '?raw=1');
    
        let previewUrl;
        if (dropboxPreview) {
            const sharedPreview = await dbx.sharingCreateSharedLinkWithSettings({ path: dropboxPreview.result.path_lower });
            previewUrl = sharedPreview.result.url.replace('?dl=0', '?raw=1');
        }
    
        const nuevoRecurso = new Recurso({
            ...resto,
            archivoUrl,
            previewUrl
        });
    
        const recursoGuardado = await nuevoRecurso.save();
        res.status(201).json(recursoGuardado);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
})

// @desc   update recursos
// @route PUT /api/recursos/:id
// @access Private
const updateRecurso = asyncHandler( async (req, res) => {
    try {
        const recursoActualizado = await Recurso.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(recursoActualizado)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// @desc   delete recursos
// @route DELETE /api/recursos
// @access Private
const deleteRecurso = asyncHandler(async (req, res) => {
    try {
        await Recurso.findByIdAndDelete(req.params.id)
        res.json({ message: 'Recurso eliminado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// @desc   Get recurso
// @route GET /api/recursos/:id
// @access Private
const getRecurso = asyncHandler(async (req, res) => {
    try {
        const recurso = await Recurso.findById(req.params.id).populate('usuarioId').populate('categoriaId')
        if (!recurso) return res.status(404).json({ message: 'Recurso no encontrado' })
        res.json(recurso)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = {
    getRecursos,
    setRecurso,
    updateRecurso,
    deleteRecurso,
    getRecurso
}