// backend/routes/citas.js
const express = require('express');
const Cita = require('../models/Cita');
const router = express.Router();

// Ruta para agregar una nueva cita
router.post('/citas', async (req, res) => {
  const { paciente, fecha, especialidad, doctor, motivo } = req.body;
  try {
    const nuevaCita = new Cita({ paciente, fecha, especialidad, doctor, motivo });
    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para obtener todas las citas
router.get('/citas', async (req, res) => {
  try {
    const citas = await Cita.find();
    res.status(200).json(citas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para actualizar una cita
router.put('/citas/:id', async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    // Actualizar los campos con los datos del body, si se envían
    cita.paciente = req.body.paciente || cita.paciente;
    cita.fecha = req.body.fecha || cita.fecha;
    cita.especialidad = req.body.especialidad || cita.especialidad;
    cita.doctor = req.body.doctor || cita.doctor;
    cita.motivo = req.body.motivo || cita.motivo;

    const citaActualizada = await cita.save();
    res.json(citaActualizada); // Devuelve la cita actualizada
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para eliminar una cita
router.delete('/citas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await Cita.findByIdAndDelete(id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json({ message: 'Cita eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
    