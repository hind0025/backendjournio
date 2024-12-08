const jwt = require('jsonwebtoken');

// In-memory store to track logged-out tokens (for simplicity, consider a better store like Redis for production)
const loggedOutTokens = new Set();

module.exports = (req, res, next) => {
  try {
    // Retrieve token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Check if token is logged out
    if (loggedOutTokens.has(token)) {
      return res.status(401).json({ message: 'Token has been logged out, please log in again' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired, please log in again' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }

    // Catch-all for other errors
    console.error('Authentication error:', err.message);
    res.status(500).json({ message: 'Internal server error during authentication' });
  }
};
//checking
