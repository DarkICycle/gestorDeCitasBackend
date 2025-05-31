// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especialidad: { type: mongoose.Schema.Types.ObjectId, ref: 'Especialidad', required: true }
});

module.exports = mongoose.model('Doctor', doctorSchema);
