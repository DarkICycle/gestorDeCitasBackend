// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importar CORS
require('dotenv').config();
const citasRoutes = require('./routes/citas'); // Importar las rutas

// Crear la instancia de express
const app = express();
const PORT = process.env.PORT || 5000; // Usa el puerto 5000 o el que esté definido en .env

// Middleware para permitir solicitudes CORS desde el frontend
app.use(cors());  // Permite que las solicitudes de origen cruzado sean aceptadas

// Middleware para parsear datos JSON
app.use(express.json());

// Usar las rutas de citas
app.use('/api', citasRoutes); // Ruta base: /api/citas

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch((err) => console.error('🔴 Error al conectar a MongoDB', err));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

