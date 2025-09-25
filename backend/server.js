require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const sweetRoutes = require('./routes/sweetRoutes');

// Connect to MongoDB
connectDB();


const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);






const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // for testing
