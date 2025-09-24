require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const authRoutes = require('./routes/authRoutes');
const sweetRoutes = require('./routes/sweets');


// Connect to MongoDB
connectDB();


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // for testing
