const express = require('express');
const { submitRating, getServiceRatings } = require('../controllers/ratingController');
const router = express.Router();
const ratingform=require('../models/Rating')

// Submit rating and feedback
router.post('/submit', submitRating);

// Get ratings for a service
router.get('/:serviceId', getServiceRatings);
//fecth all rating form
router.get('/list', async (req, res) => {
    try {
        const ratings = await ratingform.find();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ratings', error });
    }
});

module.exports = router;