const { _calories } = require("../models/index.model");
const { _users } = require("../models/user.model");

module.exports = {
    addCalories: function(req, res, next){
        // console.log("line 5:", req.user._id);

        const { _id } = req.user;
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
        
        console.log(startOfDay, currentDate, endOfDay);
        if(startOfDay < currentDate < endOfDay){
            console.log("Yes");

            _calories.find({ user_id: _id }).then(function(value){
                console.log("value:", value);
                return res.status(200).json({ message: "", data: value });
            }).catch(function(err){
                console.error(err);
                return res.status(404).json({ message: "", data: err });
            });
        }
        

        // const { meal } = req.body;

        // const add_calories = new _calories({
        //     user_id: req.user._id,
        //     meals: meal
        // });

        // add_calories.save().then(function(value){
        //     console.log("value:", value);
        //     return res.status(200).json({ message: "Success", data: value });

        // }).catch(function(err){
        //     console.error("Error:", err);
        //     return res.status(500).json({ message: "Error", data: err });
        // })
    }
}