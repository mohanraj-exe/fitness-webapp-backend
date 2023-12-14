const { Router } = require('express');
const {
    foodData
} = require('../controllers/public.controller');

const router = Router();

router

    .get('/nutritional_facts', foodData)


module.exports = router;

