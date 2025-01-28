const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

// Endpoint untuk registrasi pengguna
router.post('/login', (req, res) => {
    const { user_id,username, password,role } = req.body;

    if (!user_id || !username || !password || !role) {
        return res.status(400).json({ message: 'Username dan password diperlukan' });
    }

    res.status(201).json({ message: 'Pendaftaran berhasil', user: { username } });
});

// Endpoint untuk login pengguna
router.post('/register', login);

module.exports = router;
