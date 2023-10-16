const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({

    username: {
        type: String,
        maxLength: 100,
        required: true,
        primaryKey: true,
        unique: true
    },

    email: {
        type: String,
        maxLength: 50,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        maxLength: 50,
        required: true
    }

})

module.exports = mongoose.model("Users", userSchema)
