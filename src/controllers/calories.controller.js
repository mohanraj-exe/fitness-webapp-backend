const { _calories } = require("../models/index.model");

module.exports = {
    addCalories: function (req, res, next) {

        const { meal } = req.body;
        const { _id } = req.user;
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

        // console.log(`${startOfDay},  ${currentDate},  ${endOfDay}`);

        _calories.findOne({ user_id: _id, createdAt: { $gte: startOfDay, $lte: endOfDay } }).then(function (value) {
            console.log("value:", value);

            if (value) {
                _calories.findOneAndUpdate({
                    user_id: _id,
                    createdAt: { $gte: startOfDay, $lte: endOfDay }
                },
                    {
                        $push: { meals: meal }
                    },
                    { returnDocument: 'after' }).then(function (value) {
                        console.log("result document:", value);
                        return res.status(200).json({ message: "Success", data: value });
                    })
            }
            else {

                const add_calories = new _calories({
                    user_id: req.user._id,
                    meals: meal
                });

                add_calories.save().then(function (value) {
                    console.log("value:", value);
                    return res.status(200).json({ message: "Success", data: value });

                }).catch(function (err) {
                    console.error("Error:", err);
                    return res.status(500).json({ message: "Error", data: err });
                })

            }
        }).catch(function (err) {
            console.error(err);
            return res.status(404).json({ message: "", data: err });
        });
    },
    viewCalories: function (req, res, next) {

        const { _id } = req.user;
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

        // console.log(`${startOfDay},  ${currentDate},  ${endOfDay}`);

        _calories.findOne({ user_id: _id, createdAt: { $gte: startOfDay, $lte: endOfDay } }).then(function (value) {
            console.log("value:", value);
            return res.status(200).json({ message: "Success", data: value })
        })
    },
    listCaloriesByDate: function (req, res, next) {

        const { _id } = req.user;
        const { inputDate } = req.query;
        // console.log("inputDate:", inputDate, typeof(inputDate), new Date(inputDate).setHours(0,0,0));

        _calories.findOne({ user_id: _id, createdAt: { $gte: new Date(inputDate).setHours(0,0,0), $lte: new Date(inputDate).setHours(23,59,59) } }).then(function (value) {
            console.log("value:", value);
            return res.status(200).json({ message: "Success", data: value })
        });
    }
}