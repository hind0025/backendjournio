const RatingModel = require('../models/Rating');
const token=require("jsonwebtoken")

// Submit rating and feedback
const submitRating = async (req, res) => {
  const { Name, Email, Rating, Comments } = req.body;

  try {
    // Create a new rating document
    const newRating = new RatingModel({
      Name,
      Email,
      Rating,
      Comments,
    });

    // Save to database
    await newRating.save();

    res.status(201).json({ message: 'Rating submitted successfully!' });
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

// const secureRating=async(req,res)=>
// {
//   const{email}=req.body;
//   try{
//     const security=await RatingModel.find({Email})
//     res.status(200).json({});
//   }
//   catch(error)
//   {
//     res.status(400).json({error:error.message});
//   }
// }

module.exports = { submitRating, getServiceRatings };