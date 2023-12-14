const Router = require("express");

// importing modules
const userRouter = require("./user.router");
const publicRouter = require("./public.router");
const calorieRouter = require("./calories.router");


const router = Router();
router.use('/public', publicRouter);
router.use('/user', userRouter);
router.use('/calories', calorieRouter);

module.exports = router;