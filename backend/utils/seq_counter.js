const mongoose = require('mongoose');
const Counter = require('../models/counterModel');

//mongoose.Connection().
async function getNextSequence(id) {
    const counter = await Counter.findOneAndUpdate(
        { id },  // Find by the 'id' field, not the default '_id'
        { $inc: { seq: 1 } },  // Increment the sequence
        { new: true, upsert: true }  // Return the updated document, create if it doesn't exist
      );
      return counter.seq;
};

module.exports ={ getNextSequence};