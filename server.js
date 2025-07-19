const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ override: true });
console.log("Connecting to Mongo URI:", process.env.MONGO_URI);
connectDB();

const app = express();
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
