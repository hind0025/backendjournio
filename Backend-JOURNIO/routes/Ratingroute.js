const express = require('express');
const { submitRating, getServiceRatings } = require('../controllers/ratingController');
const router = express.Router();

// Submit rating and feedback
router.post('/submit', submitRating);

// Get ratings for a service
router.get('/:serviceId', getServiceRatings);

module.exports = router;