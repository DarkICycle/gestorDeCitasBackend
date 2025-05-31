const express = require('express');
const router = express.Router();
const moment = require('moment');
const Cita = require('../models/Cita');
const Doctor = require('../models/Doctor');

// POST: Crear cita 
router.post('/citas', async (req, res) => {
  const { paciente, fecha, especialidad, doctor, motivo } = req.body;

  try {
    const doctorData = await Doctor.findById(doctor);
    if (!doctorData) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }

   
    const fechaInicio = moment(fecha).startOf('day').toDate();
    const fechaFin = moment(fecha).endOf('day').toDate();

    const citaExistente = await Cita.findOne({
      doctor,
      fecha: {
        $gte: fechaInicio,
        $lte: fechaFin
      }
    });

    if (citaExistente) {
      return res.status(400).json({ error: 'Ya existe una cita para ese doctor en esa fecha' });
    }

    const nuevaCita = new Cita({
      paciente,
      fecha: fechaInicio,
      especialidad,
      doctor,
      motivo
    });

    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Obtener todas las citas
router.get('/citas', async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('especialidad', 'nombre')
      .populate('doctor', 'nombre')
      .sort({ fecha: 1 });

    res.status(200).json(citas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Actualizar una cita (sin hora)
router.put('/citas/:id', async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    cita.paciente = req.body.paciente || cita.paciente;
    cita.fecha = req.body.fecha || cita.fecha;
    cita.especialidad = req.body.especialidad || cita.especialidad;
    cita.doctor = req.body.doctor || cita.doctor;
    cita.motivo = req.body.motivo || cita.motivo;

    const citaActualizada = await cita.save();
    res.json(citaActualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Eliminar una cita
router.delete('/citas/:id', async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json({ message: 'Cita eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Obtener doctores por especialidad
router.get('/por-especialidad/:especialidadId', async (req, res) => {
  try {
    const doctores = await Doctor.find({ especialidad: req.params.especialidadId }).sort({ nombre: 1 });
    res.json(doctores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener historial de citas por nombre del paciente
router.get('/citas/paciente/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;
    const citas = await Cita.find({ paciente: nombre })
      .populate('especialidad', 'nombre')
      .populate('doctor', 'nombre');

    if (citas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron citas para este paciente' });
    }

    res.json(citas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el historial del paciente' });
  }
});


module.exports = router;
