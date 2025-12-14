const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const sweetRoutes = require('./routes/sweetRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'dist', 'index.html'));
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
