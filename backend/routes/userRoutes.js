const express = require('express');
const router = express.Router();
const { register, login, getProfil } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);       // POST /api/users/register
router.post('/login', login);             // POST /api/users/login
router.get('/profil', protect, getProfil); // GET  /api/users/profil

module.exports = router;