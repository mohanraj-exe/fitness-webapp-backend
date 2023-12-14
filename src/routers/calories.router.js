const { Router } = require('express');
const {
    addCalories,
    viewCalories,
    listCaloriesByDate,
    // updateCalories,
    // deleteCalories
} = require('../controllers/calories.controller');
const { auth_middleware } = require('../middleware/auth.middleware');

const router = Router();

router

    .post('/add', auth_middleware, addCalories)
    .get('/view', auth_middleware, viewCalories)
    .get('/list_by_date', auth_middleware, listCaloriesByDate)
    // .post('/patch', updateCalories)
    // .post('/delete', deleteCalories)


module.exports = router;

