const mongoose = require('mongoose');
const Alumni = require('../Models/Alumni'); // Adjust the path based on where your User model is located
require('dotenv').config({path:'../.env'}); // Load environment variables

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

// Delete all users
const deleteAllAlumnis = async () => {
  try {
    await Alumni.deleteMany({}); // Deletes all documents in the User collection
    console.log('All Alumni have been deleted.');
    process.exit(0); // Exit process after successful deletion
  } catch (error) {
    console.error('Error deleting users:', error);
    process.exit(1); // Exit process with failure
  }
};

// Main function to run the script
const runScript = async () => {
  await connectDB(); // Connect to the database
  await deleteAllAlumnis(); // Delete all users
};

runScript();