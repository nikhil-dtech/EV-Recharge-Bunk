const Booking = require('../models/Booking')
const Station = require('../models/Station');

exports.bookSlot = async (req, res) => {
  try {
    const { userId, stationId, date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: 'Date and time are required' });
    }

    const slotTime = new Date(`${date}T${time}`);

    const booking = new Booking({ userId, stationId, slotTime });
    await booking.save();

    res.status(201).json({ message: 'Slot booked successfully', booking });
  } catch (error) {
    console.error('Booking failed:', error);
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};


exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
    .populate('stationId', 'name location')  // Get station name
    .populate('userId', 'name');             // Optional: Get user name too

    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message })
  }
}

exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stations', error: error.message });
  }
};
