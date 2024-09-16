const mongoose = require('mongoose');

// Counter schema
const counterSchema = new mongoose.Schema({
  id: { type: String, required: true },  // This will hold the collection name (e.g., 'login')
  seq: { type: Number, default: 0 }
});

// Create and export the Counter model
const Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;
