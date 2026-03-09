const Project = require('../models/Project');

// 📌 Créer une mission (client)
const creerMission = async (req, res) => {
  try {
    const { titre, description, budget } = req.body;

    const project = await Project.create({
      titre,
      description,
      budget,
      client: req.user.id
    });

    res.status(201).json({ message: '✅ Mission créée', project });
  } catch (error) {
    res.status(500).json({ message: '❌ Erreur serveur', error: error.message });
  }
};

// 📌 Voir toutes les missions ouvertes
const getMissions = async (req, res) => {
  try {
    const projects = await Project.find({ statut: 'ouvert' })
      .populate('client', 'nom email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: '❌ Erreur serveur', error: error.message });
  }
};

// 📌 Voir une mission par ID
const getMissionById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'nom email')
      .populate('candidatures.freelance', 'nom email note');
    if (!project) return res.status(404).json({ message: '❌ Mission non trouvée' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: '❌ Erreur serveur', error: error.message });
  }
};

// 📌 Postuler à une mission (freelance)
const postuler = async (req, res) => {
  try {
    const { message, prix } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: '❌ Mission non trouvée' });
    if (project.statut !== 'ouvert') return res.status(400).json({ message: '❌ Mission fermée' });

    // Vérifier si déjà candidaté
    const dejaCandidat = project.candidatures.find(
      c => c.freelance.toString() === req.user.id
    );
    if (dejaCandidat) return res.status(400).json({ message: '❌ Vous avez déjà postulé' });

    project.candidatures.push({ freelance: req.user.id, message, prix });
    await project.save();

    res.json({ message: '✅ Candidature envoyée', project });
  } catch (error) {
    res.status(500).json({ message: '❌ Erreur serveur', error: error.message });
  }
};

// 📌 Choisir un freelance (client)
const choisirFreelance = async (req, res) => {
  try {
    const { freelanceId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: '❌ Mission non trouvée' });
    if (project.client.toString() !== req.user.id)
      return res.status(403).json({ message: '❌ Non autorisé' });

    // Mettre à jour la candidature acceptée
    project.candidatures = project.candidatures.map(c => ({
      ...c._doc,
      statut: c.freelance.toString() === freelanceId ? 'acceptée' : 'refusée'
    }));

    project.freelanceChoisi = freelanceId;
    project.statut = 'en_cours';
    await project.save();

    res.json({ message: '✅ Freelance sélectionné', project });
  } catch (error) {
    res.status(500).json({ message: '❌ Erreur serveur', error: error.message });
  }
};

// 📌 Noter le freelance (client)
const noterFreelance = async (req, res) => {
  try {
    const { note } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: '❌ Mission non trouvée' });
    if (project.client.toString() !== req.user.id)
      return res.status(403).json({ message: '❌ Non autorisé' });

    project.note = note;
    project.statut = 'terminé';
    await project.save();

    res.json({ message: '✅ Note enregistrée', project });
  } catch (error) {
    res.status(500).json({ message: '❌ Erreur serveur', error: error.message });
  }
};

module.exports = { creerMission, getMissions, getMissionById, postuler, choisirFreelance, noterFreelance };