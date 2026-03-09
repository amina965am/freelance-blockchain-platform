const express = require('express');
const router = express.Router();
const {
  creerMission, getMissions, getMissionById,
  postuler, choisirFreelance, noterFreelance
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, creerMission);                        // Créer mission
router.get('/', getMissions);                                   // Voir toutes les missions
router.get('/:id', getMissionById);                             // Voir une mission
router.post('/:id/postuler', protect, postuler);                // Postuler
router.put('/:id/choisir', protect, choisirFreelance);          // Choisir freelance
router.put('/:id/noter', protect, noterFreelance);              // Noter freelance

module.exports = router;