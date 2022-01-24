const dotenv = require("dotenv"); //env dosyalarini okumak icin
dotenv.config({ path: "./config/env/config.env" });
const mongoose = require('mongoose');
const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PWD
    })
        .then(() => {
            console.log("Db Connected");
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = connectDatabase;