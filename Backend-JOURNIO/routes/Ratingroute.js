const express = require('express');
const { submitRating, getServiceRatings } = require('../controllers/ratingController');
const router = express.Router();
const ratingform=require('../models/Rating');
const authMiddleware = require('../middleware/authMiddleware');
//const{loggedOutTokens}=require('../middleware/authMiddleware')
const{secure}=require("../middleware/controlMiddleware")


// Submit rating and feedback
router.post('/feedback',secure, submitRating,);

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