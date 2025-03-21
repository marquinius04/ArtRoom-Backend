const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, getGoal, deleteGoal} = require('../controller/goalController')

router.get('/', getGoals)

router.post('/', setGoal)

router.put('/:id', updateGoal)

router.get('/:id', getGoal)

router.delete('/:id', deleteGoal)

module.exports = router
