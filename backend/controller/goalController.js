const asyncHandler = require('express-async-handler')

// @desc   Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get goals'})
})

// @desc   set goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Por favor ingrese datos para añadir')
    }
    res.status(200).json({message: 'set goals'})
})

// @desc   update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler( async (req, res) => {
    res.status(200).json({message: `message: update goal ${req.params.id}`})
})

// @desc   delete goals
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `delete goal id: ${req.params.id}`})
})

// @desc   Get goal
// @route GET /api/goals/:id
// @access Private
const getGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get goal id: ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    getGoal
}