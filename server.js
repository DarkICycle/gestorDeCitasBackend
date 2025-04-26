const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const citasRoutes = require('./routes/citas');

// Crear la instancia de express
const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS para producción (permite solo desde el frontend en Vercel)
const whitelist = [process.env.FRONTEND_URL]; 
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// Usar las rutas de citas
app.use('/api', citasRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch((err) => console.error('🔴 Error al conectar a MongoDB', err));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
