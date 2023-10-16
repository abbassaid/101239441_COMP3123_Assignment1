const express = require('express')
const mongoose = require("mongoose")
const userRoutes = require('./routes/User')
const employeeRoutes = require('./routes/Employee')

// Port number I used
const SERVER_PORT = 8585

const app = express()
const apiV1 = express()

// My specific connection
const DB_CONNECTION_STRING = "mongodb+srv://abbassaid:GeorgeBrown123@cluster0.e8qefyb.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"

// Connecting to Mongo Atlas
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


// Connecting to the database
const db = mongoose.connection
db.on("error", (error) => {
    console.log(error)
})

db.once("connected", () => {
    console.log("Mongoose is connected")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Making sure the app uses the specific path needed
app.use("/api/v1/", apiV1)

// Adding paths for user routes and employee routes
apiV1.use("/user", userRoutes)
apiV1.use("/emp", employeeRoutes)

//http://localhost:8585/api/v1/
app.get('/', (req, res) => {
    res.send("<h1>Assignment 1 Home Page</h1>")
})


app.listen(SERVER_PORT, () => {
    console.log(`Server Started...http://localhost:${SERVER_PORT}`)
})
