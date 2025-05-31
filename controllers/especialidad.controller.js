const Especialidad = require('../models/Especialidad');

// Obtener todas las especialidades
const obtenerEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.find().sort({ nombre: 1 });
    res.json(especialidades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agregar nueva especialidad
const agregarEspecialidad = async (req, res) => {
  try {
    let { nombre } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    nombre = nombre.trim();

    const yaExiste = await Especialidad.findOne({
      nombre: { $regex: `^${nombre}$`, $options: 'i' },
    });

    if (yaExiste) {
      return res.status(400).json({ error: 'La especialidad ya existe' });
    }

    const nueva = new Especialidad({ nombre });
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar especialidad
const eliminarEspecialidad = async (req, res) => {
  try {
    await Especialidad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Especialidad eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  obtenerEspecialidades,
  agregarEspecialidad,
  eliminarEspecialidad,
};
