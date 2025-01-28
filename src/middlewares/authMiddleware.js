const jwt = require('jsonwebtoken');
dotenv = require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token tidak ditemukan' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token tidak valid', error });
    }
}

module.exports = { authenticateToken };
