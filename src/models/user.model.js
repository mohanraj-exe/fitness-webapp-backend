const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    height:{
        type: Number
    },
    weight:{
        type: Number
    }
}, {timestamps: true});

// exports._users = mongoose.model('user', userSchema)
const _users = mongoose.model('user', userSchema);
module.exports = { _users };