const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  slots: Number
});

module.exports = mongoose.model('Station', stationSchema);
