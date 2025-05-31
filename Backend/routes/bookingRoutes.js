const express = require('express')
const router = express.Router()

const Station = require('../models/Station'); // ✅ Required to use Station model


const { bookSlot, getBookings, getAllStations } = require('../controllers/bookingController')

router.post('/book', bookSlot)
router.get('/', getBookings)
router.get('/stations', getAllStations)

router.get('/seed', async (req, res) => {
    await Station.insertMany([
      { name: 'Volti FastCharge', location: 'MG Road', latitude: 28.6, longitude: 77.2, slots: 5 },
      { name: 'EcoPower Station', location: 'Cyber City', latitude: 28.62, longitude: 77.23, slots: 3 }
    ]);
    res.send('Stations seeded');
  });
  

module.exports = router
