const mongoose = require("mongoose")

let employeeSchema = new mongoose.Schema({

    first_name: {
        type: String,
        maxLength: 100,
        required: true,
    },

    last_name: {
        type: String,
        maxLength: 50,
        required: true,
    },

    email: {
        type: String,
        maxLength: 50,
        unique: true,
        required: true,
        lowercase: true
    },

    gender: {
        type: String,
        maxLength: 25,
        enum: {
            values: ['Male', 'Female', 'Other']
        },
        required: true
    },

    salary: {
        type: Number,
        required: true,
    }

})

module.exports = mongoose.model("Employees", employeeSchema)
