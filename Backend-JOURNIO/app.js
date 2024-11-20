// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// require('dotenv').config(); 
// const bodyParser = require('body-parser');
// const bookingRoutes = require('./routes/booking');

// const app = express();
// app.use('/api', bookingRoutes);
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'Public', 'journio')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Public', 'journio', 'index.html'));
// });
// app.get('/hotel', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Public', 'journio', 'hotel.html'));
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Public', 'journio', 'login.html'));
// });

// const authRoutes = require('./routes/auth'); 
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); 

// Route Imports
const authRoutes = require('./routes/auth'); 
const geminiRoutes = require('./routes/geminiRoute');
const bookingRoutes = require('./routes/booking');

const app = express();

// ===== Middleware =====
// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from "Public/journio"
app.use(express.static(path.join(__dirname, 'Public', 'journio')));

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ===== Routes =====
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/gemini', geminiRoutes); // Gemini AI routes
app.use('/api', bookingRoutes); // Booking routes

// Frontend Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'journio', 'index.html'));
});
app.get('/hotel', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'journio', 'hotel.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'journio', 'login.html'));
});
console.log("CHANGE TEST")

// ===== Error Handling Middleware =====
// app.use((req, res, next) => {
//     res.status(404).json({ error: 'Route not found' });
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: 'Internal server error' });
// });

// ===== Start Server =====
const PORT = process.env.PORT || 3001; // Use environment variable or default to 3001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});