const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Force root "/" to show home.html instead of default index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../Frontend/home.html'));
});

// ✅ Serve Frontend Static Files (HTML, CSS, JS)
app.use(express.static(path.resolve(__dirname, '../Frontend')));



// No wildcard route! Let Express handle static routing normally

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
