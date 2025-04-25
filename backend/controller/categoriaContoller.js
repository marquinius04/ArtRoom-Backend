const asyncHandler = require('express-async-handler')

const Categoria = require('../models/categoriaModel')

// @desc   Get categorias
// @route GET /api/categorias
// @access Private
const getCategorias = asyncHandler(async (req, res) => {
    const categorias = await Categoria.find()
    res.status(200).json(categorias)
})

// @desc   set categorias
// @route POST /api/categorias
// @access Private
const setCategoria = asyncHandler(async (req, res) => {
    if (!req.body.nombre_categoria) {
        res.status(400)
        throw new Error('Por favor ingrese datos para añadir')
    }

    const nuevaCategoria = await Categoria.create({
        nombre_categoria: req.body.nombre_categoria
    })

    res.status(200).json(nuevaCategoria)
})


// @desc   update categorias
// @route PUT /api/categorias/:id
// @access Private
const updateCategoria = asyncHandler( async (req, res) => {
    const categoriaExistente = await Categoria.findById(req.params.id)

    if (!categoriaExistente) {
        res.status(404)
        throw new Error('Categoría no encontrada')
    }
    
    const updatedCategoria = await Categoria.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    
    res.status(200).json(updatedCategoria)
    
})

// @desc   delete categorias
// @route DELETE /api/categorias
// @access Private
const deleteCategoria = asyncHandler(async (req, res) => {
    const categoriaBorrar = await Categoria.findById(req.params.id)

    if (!categoriaBorrar) {
        res.status(404)
        throw new Error('Categoría no encontrada')
    }

    await Categoria.findByIdAndDelete(req.params.id)

    res.status(200).json({ id_borrado: req.params.id })
})


// @desc   Get Categoria
// @route GET /api/categorias/:id
// @access Private
const getCategoria = asyncHandler(async (req, res) => {
    const categoria = await Categoria.findById(req.params.id)

    if (!categoria) {
        res.status(404)
        throw new Error('Categoría no encontrada')
    }

    res.status(200).json(categoria)
})


module.exports = {
    getCategorias,
    setCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoria
}