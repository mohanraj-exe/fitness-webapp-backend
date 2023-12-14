const { Router } = require('express');
const {
    addCalories,
    // viewCalories,
    // updateCalories,
    // deleteCalories
} = require('../controllers/calories.controller');
const { auth_middleware } = require('../middleware/auth.middleware');

const router = Router();

router

    .post('/add', auth_middleware, addCalories)
    // .post('/view', viewCalories)
    // .post('/patch', updateCalories)
    // .post('/delete', deleteCalories)


module.exports = router;

