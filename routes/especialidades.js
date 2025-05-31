const express = require('express');
const Especialidad = require('../models/Especialidad');
const router = express.Router();

// Obtener todas las especialidades ordenadas
router.get('/', async (req, res) => {
  try {
    const especialidades = await Especialidad.find().sort({ nombre: 1 });
    res.json(especialidades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar nueva especialidad
router.post('/', async (req, res) => {
  try {
    let { nombre } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    nombre = nombre.trim();

    const yaExiste = await Especialidad.findOne({
      nombre: { $regex: `^${nombre}$`, $options: 'i' }
    });

    if (yaExiste) {
      return res.status(400).json({ error: 'La especialidad ya existe' });
    }

    const nueva = new Especialidad({ nombre });
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'La especialidad ya existe (duplicado)' });
    }
    res.status(400).json({ error: err.message });
  }
});

// Eliminar especialidad por ID
router.delete('/:id', async (req, res) => {
  try {
    await Especialidad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Especialidad eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
