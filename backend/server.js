const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('🚀 Serveur FreeLance DApp fonctionne !');
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Serveur lancé sur le port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log('❌ Erreur MongoDB :', err.message);
  });