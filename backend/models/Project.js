const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
  freelance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  statut: {
    type: String,
    enum: ['en_attente', 'acceptée', 'refusée'],
    default: 'en_attente'
  }
});

const projectSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  freelanceChoisi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  candidatures: [candidatureSchema],
  statut: {
    type: String,
    enum: ['ouvert', 'en_cours', 'terminé'],
    default: 'ouvert'
  },
  note: {
    type: Number,
    default: null   // note donnée par le client à la fin
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);