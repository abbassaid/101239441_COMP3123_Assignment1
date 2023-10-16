let express = require('express')
let employeeRoutes = express.Router()
let EmployeeModel = require("../models/Employees")

employeeRoutes.route("/employees")
    // Getting all employees
    .get(async (req, res) => {
        try {
            var employeeList = await EmployeeModel.find()
            res.status(200).json(employeeList)
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Could not get all employees"
            })
        }
    })

    // Creating an employee
    .post(async (req, res) => {
        try {
            // Making sure all fields are not empty
            const requiredFields = ['first_name', 'last_name', 'email', 'gender', 'salary']
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

            // Validating the gender value
            const allowedGenders = ["Male", "Female", "Other"]
            if (!allowedGenders.includes(req.body.gender)) {
                return res.status(400).json({
                    status: false,
                    message: "Please enter from the following genders: \"Male\", \"Female\", \"Other\""
                })
            }

            // Checking if an employee already uses an email that exists
            const existingEmployee = await EmployeeModel.findOne({
                email: req.body.email
            })

            if (existingEmployee) {
                return res.status(400).json({
                    status: false,
                    message: "An employee already has the username to their account"
                })
            }

            // Adding employee
            var newEmployee = new EmployeeModel({
                ...req.body
            })
            await newEmployee.save()
            res.status(201).json(newEmployee)

        // Catching all other errors
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Could not create employee"
            })
        }
    })

employeeRoutes.route("/employees/:eid")
    // Getting employee by ID
    .get(async (req, res) => {
        try {
            var employee = await EmployeeModel.findById(req.params.eid)
            res.status(200).json(employee)
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "No employee with that specified id"
            })
        }
    })

    .put(async (req, res) => {
        // Updating existing employee by ID
        try {
            // Valid categories for employees
            const validCategories = ['first_name', 'last_name', 'email', 'gender', 'salary']

            // Check if any of the provided categories is valid
            const invalidCategoriesProvided = Object.keys(req.body).filter(category => !validCategories.includes(category))

            // If there are invalid categories, it will show them the invalid categories they wrote and
            // all the correct categories
            if (invalidCategoriesProvided.length > 0) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid categories provided use the correct categories",
                    invalidCategories: invalidCategoriesProvided,
                    allValidCategories: validCategories
                })
            }

            const updatedEmployee = await EmployeeModel.findByIdAndUpdate(req.params.eid, req.body)
            res.status(200).json(updatedEmployee.first_name + " " + updatedEmployee.last_name + " information has been updated")
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Sorry could not update employee details"
            })
        }
    })

employeeRoutes.delete("/employees", async (req, res) => {
    try {
        // Getting the ID specified in the query
        const eid = req.query.eid

        // Delete the employee with the specified ID
        await EmployeeModel.findOneAndDelete({ _id: eid })
        res.status(204).json({
            status: true,
            message: "Employee deleted"
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Employee Not found"
        })
    }
})


module.exports = employeeRoutes