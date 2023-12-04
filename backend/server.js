const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const userRoutes = require('./routes/User')
const employeeRoutes = require('./routes/Employee')

// Port number I used
const SERVER_PORT = 8585

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// My specific connection
const DB_CONNECTION_STRING = "mongodb+srv://abbassaid:GeorgeBrown123@cluster0.e8qefyb.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"

// Connecting to Mongo Atlas
mongoose
    .connect(DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDB ");
    })
    .catch((err) => {
        console.log(
            "Can not connect to the database. Please try again later",
            err
        );
        process.exit();
    });


// Adding paths for user routes and employee routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/emp", employeeRoutes)

//http://localhost:8585/api/v1/
app.get('/', (req, res) => {
    res.send("<h1>Assignment 1 Home Page</h1>")
})


app.listen(SERVER_PORT, () => {
    console.log(`Server Started...http://localhost:${SERVER_PORT}`)
})
