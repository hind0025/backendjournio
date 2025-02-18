const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); 
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/booking');
const ratingRoutes = require('./routes/Ratingroute');

const geminiRoutes = require('./routes/gemini');
const paymentRoutes = require('./routes/paymentRoutes');
const {secure}=require("./middleware/controlMiddleware")


const authMiddleware = require('./middleware/authMiddleware'); // Auth middlewar

const cors = require('cors');
const app = express();
app.use(cors());
app.use('/api', bookingRoutes);
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'Public', 'journio')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'journio', 'index.html'));
});
app.get('/hotel', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'journio', 'hotel.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'journio', 'login.html'));
});



app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public','journio', 'gemini-chat.html'));
});




const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/gemini', geminiRoutes); 

app.use('/api/ratings',secure,ratingRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
