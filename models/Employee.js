const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'Invalid email'] 
  },
  department: { type: String, required: true },
  salary: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Employee', employeeSchema);
