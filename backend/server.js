require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // ✅ ADD THIS
const dataRoutes = require('./routes/dataRoutes');

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// Routes
app.use('/api', dataRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Dashboard API is running' });
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});