const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  uniqueId: {
    type: Number, // Or String if you prefer UUIDs
    required: true,
    unique: true, // Ensure each employee has a unique ID
  },
//   image: {
//     type: String, // URL or path to the image
//     required: false, // This can be optional
//   },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  mobile: {
    type: String,
    required: true,
    unique: true, // Ensure mobile number is unique
    match: [
      /^\d{10}$/, // Adjust regex for your phone number format (assuming 10-digit)
      'Please fill a valid mobile number',
    ],
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Gender can be restricted to certain values
    required: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  createDate: {
    type: Date,
    default: Date.now, // Automatically set the current date when the record is created
  },
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
