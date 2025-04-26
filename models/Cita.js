// backend/models/Cita.js
const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  paciente: { type: String, required: true },
  fecha: { type: Date, required: true },
  especialidad: { type: String, required: true },
  doctor: { type: String, required: true },
  motivo: { type: String, required: true }
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;
