const express = require('express');
const router = express.Router();
const Station = require('../models/Station');

// Get all stations
router.get('/stations', async (req, res) => {
  const stations = await Station.find();
  res.json(stations);
});

// Add a new station
router.post('/stations', async (req, res) => {
  try {
    const { name, location, latitude, longitude, slots } = req.body;
    const station = new Station({ name, location, latitude, longitude, slots });
    await station.save();
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add station', error: error.message });
  }
});

// Delete a station
router.delete('/stations/:id', async (req, res) => {
  try {
    await Station.findByIdAndDelete(req.params.id);
    res.json({ message: 'Station deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

module.exports = router;
