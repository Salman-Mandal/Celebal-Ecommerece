const mongoose = require("mongoose");
require("dotenv").config();


function connectdb() {

    const url = process.env.MONGODB_URI;

    mongoose.connect(url).then(() => {
        console.log("database connected");
    })

}

module.exports = connectdb;