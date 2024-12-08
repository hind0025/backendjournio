const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// In-memory store to track logged-out tokens
const loggedOutTokens = new Set();


exports.signup = async (req, res) => {
    const body = req.body;
    console.log('Signup Request Body:', body); 
    const { username, email, phoneNumber, password } = req.body;

    if (!username || !email || !phoneNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, phoneNumber, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    console.log('Login Request Body:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.logout = (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    // Add the token to the logged-out set
    loggedOutTokens.add(token);

    // Optionally, set a timeout to clear the token after expiration
    setTimeout(() => loggedOutTokens.delete(token), 3600000); // 1 hour in milliseconds

    res.status(200).json({ message: 'Successfully logged out' });
};