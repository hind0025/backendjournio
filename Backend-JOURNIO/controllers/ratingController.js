const RatingModel = require('../models/Rating');

// Submit rating and feedback
const submitRating = async (req, res) => {
  const { Name,  Rating, Comments } = req.body;

  try {
    const newRating = new RatingModel({ Name, Rating, Comments });
    await newRating.save();

    res.status(201).json({ message: 'Rating submitted successfully!'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ratings for a service
const getServiceRatings = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const ratings = await RatingModel.find({ serviceId }).populate('userId', 'name');
    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitRating, getServiceRatings };