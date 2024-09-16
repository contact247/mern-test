const mongoose = require('mongoose');

// Define the login schema
const loginSchema = new mongoose.Schema({
  s_no: { type: Number, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create and export the model
const Login = mongoose.model('Login', loginSchema);
module.exports = Login;
