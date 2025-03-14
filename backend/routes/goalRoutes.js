const express = require('express')
const router = express.Router()
const {getGoals} = require('../controller/goalController')

router.get('/', getGoals)

router.post('/', (req, res) => {
    res.status(200).json({message: 'set goals'})
})

router.put('/:id', (req, res) => {
    res.status(200).json({message: `message: update goal ${req.params.id}`})
})

router.get('/:id', (req, res) => {
    res.status(200).json({message: `Get goal id: ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
    res.status(200).json({message: `delete goal id: ${req.params.id}`})
})
module.exports = router
