const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Login = require('../models/loginModel'); // Import the model
const {getNextSequence} = require('../utils/seq_counter');


// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Check if all required fields are provided
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    // Check if the username already exists
    const existingUser = await Login.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const next_s_no = await getNextSequence("login");
    // Create a new user
    const newUser = new Login({
      s_no:next_s_no,
      username,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    return res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
