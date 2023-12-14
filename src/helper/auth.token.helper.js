const jwt = require("jsonwebtoken");

module.exports = {
    access_token: function (_id) {
        const token = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        return token;
    }
}