const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 📌 Inscription
const register = async (req, res) => {
  try {
    const { nom, email, motDePasse, role } = req.body;

    // Vérifier si l'email existe déjà
    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ message: '❌ Email déjà utilisé' });
    }

    // Chiffrer le mot de passe
    const salt = await bcrypt.genSalt(10);
    const motDePasseChiffre = await bcrypt.hash(motDePasse, salt);

    // Créer l'utilisateur
    const user = await User.create({
      nom,
      email,
      motDePasse: motDePasseChiffre,
      role
    });

    // Créer le token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: '✅ Inscription réussie',
      token,
      user: { id: user._id, nom: user.nom, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ message: '❌ Erreur serveur', error: error.message });
  }
};

// 📌 Connexion
const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Chercher l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '❌ Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const motDePasseOk = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!motDePasseOk) {
      return res.status(400).json({ message: '❌ Email ou mot de passe incorrect' });
    }

    // Créer le token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: '✅ Connexion réussie',
      token,
      user: { id: user._id, nom: user.nom, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ message: '❌ Erreur serveur', error: error.message });
  }
};

// 📌 Profil utilisateur
const getProfil = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-motDePasse');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '❌ Erreur serveur', error: error.message });
  }
};

module.exports = { register, login, getProfil };