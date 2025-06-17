const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        console.log(bookingData);
        const booking = new Booking(bookingData);
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (err) {
        console.error('Error creating booking:', err);
        console.log("THIISHISHISHISHIHSI")
        res.status(500).json({ message: 'Server error' });
    }
};
