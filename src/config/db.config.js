const mongoose = require("mongoose");

module.exports = function () {
    return new Promise(function (resolve, reject) {

        mongoose.connection.on('error', function (err) {
            console.log(`MongoDB connection error: ${err}`)
            process.exit('1');
        });

        mongoose.connection.on('disconnected', function(){
            console.log('MongoDB disconnected');
            // You might want to handle reconnection here if desired
        });

        mongoose.connection.on('reconnected', function(){
            console.log('MongoDB reconnected');
            // You might want to perform some actions after reconnection
        });

        mongoose.connection.on('connected', function () {
            console.log("MongoDB connected!!!");
            resolve();
        });

        mongoose.connect(process.env.MONGODB_URI)
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                console.log({ error: err });
                reject(err);
            })
    });
};
