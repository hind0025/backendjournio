const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  Name: {
    // type: mongoose.Schema.Types.ObjectId,
    type:String,
    //ref: 'User',
    required: true,
  },
  Email : {
    //type: mongoose.Schema.Types.ObjectId,
    type:String,
    //ref: 'Service', // Assume services are stored in a Service model
    required: true,
  },
  Rating: {
    type: String,
    
    required: true,
  },
  Comments: {
    type: String,
    maxlength: 500,
  },

});

module.exports = mongoose.model('Rating', ratingSchema);