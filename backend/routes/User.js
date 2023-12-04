const express = require('express')
const userRoutes = express.Router()
const UserModel = require("../models/Users")

userRoutes.post("/signup", async (req, res) => {
    // Creating Users
    try {
        // Making sure all fields are not empty
        const requiredFields = ['username', 'email', 'password']
        const missingFields = []

        // Finding all fields that are empty
        for (const field of requiredFields) {
            if (req.body[field] === undefined) {
                missingFields.push(`Please enter ${field}`)
            }
        }

        // Showing the user which field they need to have
        if (missingFields.length > 0) {
            return res.status(400).json({
                status: false,
                messages: missingFields
            })
        }

        // Check if a user with the same username or email already exists
        const existingUser = await UserModel.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        })

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "A user already has the username or email associated to their account"
            })
        }

        // Creating a user
        var newUser = new UserModel({
            ...req.body
        })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Could not create employee"
        })
    }

})


userRoutes.route("/login")
    // Logging in
    .post(async (req, res) => {
        try {
            const { username, email, password } = req.body

            // If the user is trying to log in with their email, it will change the value to lowercase
            if (email !== undefined) {
                email.toLowerCase()
            }

            // Find a user by username or email
            const user = await UserModel.findOne({
                $or: [{ username }, { email }]
            })

            if (!user) {
                // No user found with the provided username or email
                return res.status(401).json({
                    status: false,
                    message: "Invalid username and password"
                })
            }

            // Check if the provided password matches the stored password
            if (user.password !== password) {
                // Password does not match
                return res.status(401).json({
                    status: false,
                    message: "Invalid password"
                })
            }

            // Logging in once user provides the correct values
            res.status(200).json({
                status: true,
                username: user.username,
                message: "User logged in successfully"
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Could not log in"
            })
        }
    })


module.exports = userRoutes