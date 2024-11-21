const mongoose = require('mongoose');
// derfgh
const bookingSchema = new mongoose.Schema({
    from: String,
    to: String,
    airline: String,
    seating: String,
    departureDate: Date,
    departureTime: String,
    adults: Number,
    children: Number,
    infants: Number,
    fareType: String,
    returnDate: Date,
    returnTime: String,
    message: String,
    name: String,
    phone: String,
    email: String
});
//this is changes
//helloooooo
module.exports = mongoose.model('Booking', bookingSchema);
