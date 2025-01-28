const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { authMiddleware } = require('./middlewares/authMiddleware');

// Routes
const userRoutes = require('./routes/userRoutes');
const register = require('./routes/userRoutes');
const bukuRoutes = require('./routes/bukuRoutes');
const memberRoutes = require('./routes/memberRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/register', register);
app.use('/api/buku', bukuRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/transactions', transactionRoutes);

// Protected Route Example
app.get('/api/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Anda berhasil mengakses route yang dilindungi!' });
});

// Error Handling Middleware
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
