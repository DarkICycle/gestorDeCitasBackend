const mongoose = require('mongoose');

const especialidadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,      
    lowercase: true  
  }
});

especialidadSchema.index({ nombre: 1 }, { unique: true });

const Especialidad = mongoose.model('Especialidad', especialidadSchema);

module.exports = Especialidad;
