const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
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
