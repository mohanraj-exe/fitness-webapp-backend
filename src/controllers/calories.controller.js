const { _calories } = require("../models/index.model");
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    addCalories: function (req, res, next) {

        const { meal } = req.body;
        const { _id } = req.user;
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

        const mealWithUniqueId = {
            _id: new ObjectId(),
            ...meal,
        };

        _calories.findOne({ user_id: _id, createdAt: { $gte: startOfDay, $lte: endOfDay } }).then(function (value) {
            // console.log("value:", value);

            if (value) {

                _calories.findOneAndUpdate({
                    user_id: _id,
                    createdAt: { $gte: startOfDay, $lte: endOfDay }
                },
                    {
                        $push: {
                            meals: mealWithUniqueId
                        }
                    },
                    { returnDocument: 'after' }).then(function (value) {
                        // console.log("result document:", value);
                        return res.status(200).json({ message: "Success", data: value });
                    })
            }
            else {

                const add_calories = new _calories({
                    user_id: req.user._id,
                    meals: mealWithUniqueId
                });

                add_calories.save().then(function (value) {
                    // console.log("value:", value);
                    return res.status(200).json({ message: "Success", data: value });

                }).catch(function (err) {
                    // console.error("Error:", err);
                    return res.status(500).json({ message: "Error", data: err });
                })

            }
        }).catch(function (err) {
            // console.error(err);
            return res.status(404).json({ message: "", data: err });
        });
    },
    viewCalories: function (req, res, next) {

        const { _id } = req.user;
        const { inputDate } = req.query;

        const currentDate = new Date();
        const startDate = inputDate ? new Date(`${inputDate}T00:00:00.000Z`) : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
        const endDate = inputDate ? new Date(`${inputDate}T23:59:59.999Z`) : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

        _calories.findOne({
            user_id: _id,
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        })
            .then(function (value) {
                // console.log("value:", value);
                return res.status(200).json({ message: "Success", data: value })
            })
            .catch(function (err) {
                // console.error(err);
                return res.status(400).json({ message: "Error", data: err });
            });
    },
    updateCalories: async function (req, res, next) {

        const { _id } = req.user;
        const { meal_id, inputDate } = req.query;
        const { meal } = req.body;

        const currentDate = new Date();
        const startDate = inputDate ? new Date(`${inputDate}T00:00:00.000Z`) : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
        const endDate = inputDate ? new Date(`${inputDate}T23:59:59.999Z`) : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

        _calories.findOneAndUpdate({
            user_id: _id,
            createdAt: {
                $gte: startDate,
                $lte: endDate
            },
            meals: {
                $elemMatch: { _id: meal_id }
            }
        },
            {
                $set: {
                    "meals.$": {
                        _id: new ObjectId(),
                        ...meal,
                    }
                },
            },
            { returnDocument: 'after' }).then(function (value) {
                // console.log("result document:", value);
                return res.status(200).json({ message: "Success", data: value });
            })
            .catch(function (err) {
                // console.error(err);
                return res.status(400).json({ message: "Error", data: err });
            });
    }
}