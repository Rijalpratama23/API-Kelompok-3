const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./src/middlewares/errorHandler');
const bukuRoutes = require('./src/routes/bukuRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Konfigurasi dotenv
dotenv.config();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/buku', bukuRoutes);
app.use('/api/register', userRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

// Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
