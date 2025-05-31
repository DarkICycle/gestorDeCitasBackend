const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  paciente: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: Date,
    required: true
  },
  especialidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Especialidad',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  motivo: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cita', citaSchema);
