// createTestDocument.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');

  // Test Schema and Model
  const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));

  // Create a test document
  const testDocument = new Test({ name: 'Test Document' });
  testDocument.save()
    .then(doc => {
      console.log('Document saved:', doc);
      mongoose.disconnect(); 
    })
    .catch(err => {
      console.log('Error saving document:', err);
      mongoose.disconnect(); 
    });
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
