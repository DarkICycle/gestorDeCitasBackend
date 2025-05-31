const Doctor = require("../models/Doctor");
const Especialidad = require("../models/Especialidad");

// Obtener todos los doctores
const obtenerDoctores = async (req, res) => {
  try {
    const doctores = await Doctor.find().populate("especialidad").sort({ nombre: 1 });
    res.json(doctores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agregar un nuevo doctor 
const agregarDoctor = async (req, res) => {
  try {
    const { nombre, especialidad } = req.body;

    if (!nombre || !especialidad) {
      return res.status(400).json({ error: "Nombre y especialidad son obligatorios" });
    }

    const nuevo = new Doctor({ nombre, especialidad });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un doctor
const eliminarDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar doctor (sin horarios)
const editarDoctor = async (req, res) => {
  try {
    const { nombre, especialidad } = req.body;

    if (!nombre || !especialidad) {
      return res.status(400).json({ error: "Nombre y especialidad son obligatorios" });
    }

    const actualizado = await Doctor.findByIdAndUpdate(
      req.params.id,
      { nombre, especialidad },
      { new: true }
    );

    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  obtenerDoctores,
  agregarDoctor,
  eliminarDoctor,
  editarDoctor,
};
