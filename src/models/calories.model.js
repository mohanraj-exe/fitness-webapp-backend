const mongoose = require("mongoose");

const calorieSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    meals:[{
        meal: Object
    }]

}, {timestamps: true});

exports._calories = mongoose.model('calorie', calorieSchema)