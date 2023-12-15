const { Router } = require('express');
const {
    foodData, caloriesBurned, exercisesInfo, recipeData
} = require('../controllers/public.controller');

const router = Router();

router

    .get('/nutritional_facts', foodData)
    .get('/calories_burned', caloriesBurned)
    .get('/exercise_info', exercisesInfo)
    .get('/recipe_data', recipeData)


module.exports = router;

