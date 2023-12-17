const { Router } = require('express');
const {
    addCalories,
    viewCalories,
    updateCalories,
    deleteCalories
} = require('../controllers/calories.controller');
const { auth_middleware } = require('../middleware/auth.middleware');

const router = Router();

router

    .post('/add', auth_middleware, addCalories)
    .get('/view', auth_middleware, viewCalories)
    .patch('/update', auth_middleware, updateCalories)
    .delete('/delete', auth_middleware, deleteCalories)


module.exports = router;

