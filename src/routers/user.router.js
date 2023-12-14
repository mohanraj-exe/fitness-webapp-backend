const { Router } = require('express');
const {
    signup, login, all_users_sample
    // viewUser,
    // updateUser,
    // deleteUser
} = require('../controllers/user.controller');
const { auth_middleware } = require("../middleware/auth.middleware");

const router = Router();

router

    .post('/signup', signup)
    .post('/login', login)
    .get('/sample_users', auth_middleware, all_users_sample)
    // .post('/signup', signup)
    // .post('/view', viewUser)
    // .post('/patch', updateUser)
    // .post('/delete', deleteUser)


module.exports = router;

