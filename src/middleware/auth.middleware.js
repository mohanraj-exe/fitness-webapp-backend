const jwt = require("jsonwebtoken");
const { _users } = require("../models/user.model");

module.exports = {
    auth_middleware: function (req, res, next) {

        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: "Authorization token required!!!" })
        }

        const token = authorization.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            // console.log("line 16:", decoded);

            if (decoded) {
                _users.findOne({ _id: decoded._id }).select("_id").then(function (value) {
                    // console.log("value:", value);
                    
                    if (!value) {
                        return res.status(404).json({ message: "User not found" });
                    }
                    req.user = value;
                    next();
                }).catch(function (err) {
                    return res.status(500).json({ message: "Internal server error", data: err });
                })
            }
            else {
                const expired_time = err.expiredAt.toLocaleTimeString();
                delete err.expiredAt;
                return res.status(401).json({ message: { ...err, expiredAt: expired_time } });
            }
        });

    }
}