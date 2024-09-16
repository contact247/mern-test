const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel'); // Assuming you have an Employee model
const { getNextSequence } = require('../utils/seq_counter');
const mongoose = require('mongoose');

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees from MongoDB
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/employees/:id', async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id); 
      res.json(employee);
    } catch (err) {
        console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.put('/employees/:id', async (req, res) => {
    try{
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedEmployee);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });   
    }
});


// Delete an employee by ID
router.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id); // Delete employee by ID
    res.status(200).json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete employee' });
  }
});

router.post('/employees', async (req, res) => {
    try {
      // Get employee details from the request body
      const {
        name,
        email,
        mobile,
        designation,
        gender,
        course
      } = req.body;
  
      const uniqueId = await getNextSequence('employee');
      // Create a new employee instance
      const newEmployee = new Employee({
        uniqueId, // If using auto-increment,  can omit this
        name,
        email,
        mobile,
        designation,
        gender,
        course
      });
  
      // Save the employee to the database
      const savedEmployee = await newEmployee.save();
  
      // Return the newly created employee as the response
      res.status(201).json(savedEmployee);
    } catch (error) {
      // If there's an error, return a 500 status with the error message
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
