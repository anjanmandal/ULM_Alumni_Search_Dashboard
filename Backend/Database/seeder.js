const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Alumni = require('../Models/Alumni'); 
const connectToDB = require('./connect');       

dotenv.config();
connectToDB();

const alumniData = [
  {
    name: 'Alice Johnson',
    graduationYear: 2015,
    degree: 'BSc Computer Science',
    occupation: 'Software Engineer',
    location: 'New York, USA',
  },
  {
    name: 'Bob Smith',
    graduationYear: 2018,
    degree: 'BSc Chemistry',
    occupation: 'Research Scientist',
    location: 'Los Angeles, USA',
  },
  // Add more alumni data if needed
];

// Seed Function to Insert Alumni Data
const seedAlumni = async () => {
  try {
    // Delete all existing alumni data (optional, for fresh start)
    await Alumni.deleteMany();

    // Insert the new alumni data
    await Alumni.insertMany(alumniData);

    console.log('Alumni data successfully seeded!');
    process.exit(); // Exit after seeding
  } catch (error) {
    console.error('Error while seeding alumni data:', error);
    process.exit(1); // Exit with error
  }
};

seedAlumni();
