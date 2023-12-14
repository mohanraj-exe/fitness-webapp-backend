const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const {
    _users
} = require('../models/index.model');
const { access_token } = require("../helper/auth.token.helper");

module.exports = {
    signup: function (req, res, next) {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Must enter all fields!!!" })
        }
        
        _users.findOne({ email }).then(function (value) {

            if (value) {
                return res.status(500).json({ message: "Already exists!!!" })
            }
            else {

                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(function (hash) {

                    const new_user = new _users({
                        email: email,
                        password: hash
                    });

                    new_user.save().then(function (value) {
                        return res.status(200).json({ message: "new user created", data: value });
                    }).catch(function (err) {
                        return res.status(500).json({ message: "Error", data: err });
                    });

                }).catch(function (err) {
                    return res.status(500).json({ message: "Error", data: err });
                });
            }
        }).catch(function (err) {
            return res.status(500).json({ message: "Error", data: err });
        });
    },
    login: function (req, res, next) {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Must enter all fields!!!" });
        }

        _users.findOne({ email }).then(function(value){
            bcrypt.compare(password, value.password).then(function(result) {
                if(result != true){
                    return res.status(422).json({ message: "Password not matched!!!" });
                }
                else{
                    const token = access_token(value._id);
                    return res.status(200).json({ message: "Password matched!!!", data: token });
                }
            }).catch(function(err){
                return res.status(422).json({ message: "Cannot compare password!!!", data: err });
            });
        }).catch(function(){
            return res.status(404).json({ message: "User email not found!!!" });
        })
    },
    all_users_sample: function (req, res, next){
        console.log("req.user:", req.user);
        axios.get('https://jsonplaceholder.typicode.com/users').then(function(value){
            return res.status(200).json({ message: "Data fetched!!!", data: value.data });
        }).catch(function(err){
            console.error("Error:", err);
        })
    }
}