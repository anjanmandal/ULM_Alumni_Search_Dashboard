const Alumni = require('../Models/Alumni');

// @desc Get all alumni
// @route GET /api/alumni
// @access Public
const getAllAlumni = async (req, res) => {
  try {
    console.log('here');
    // Fetch all alumni from the database and populate user fields including profilePicture
    const alumni = await Alumni.find().populate('user', '_id name email profilePicture');
    
    res.json(alumni); // Send alumni data as a response
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc Search alumni based on query parameters
// @route GET /api/alumni/search
// @access Public
const searchAlumni = async (req, res) => {
    try {
        const { field, term } = req.query;
        console.log('Search field:', field, 'Search term:', term);
    
        // Define the search condition based on the selected field
        let searchQuery = {};
    
        switch (field) {
          case 'name':
            searchQuery = { name: { $regex: term, $options: 'i' } }; // Case-insensitive search by name
            break;
          case 'graduationYear':
            searchQuery = { graduationYear: parseInt(term) }; // Search by graduation year
            break;
          case 'degree':
            searchQuery = { degree: { $regex: term, $options: 'i' } }; // Case-insensitive search by degree
            break;
          case 'occupation':
            searchQuery = { occupation: { $regex: term, $options: 'i' } }; // Case-insensitive search by occupation
            break;
          case 'location':
            searchQuery = { location: { $regex: term, $options: 'i' } }; // Case-insensitive search by location
            break;
          default:
            return res.status(400).json({ message: 'Invalid search field' });
        }
    
        const alumni = await Alumni.find(searchQuery);
        res.json(alumni);
      } catch (error) {
        console.error('Error fetching alumni:', error);
        res.status(500).json({ message: 'Error fetching alumni data' });
      }
};

const addAlumni = async (req, res) => {
  try {
    const { name, graduationYear, degree, occupation, location, linkedinProfile } = req.body;
    
    // Create new alumni entry
    const newAlumni = new Alumni({
      name,
      graduationYear,
      degree,
      occupation,
      location,
      linkedinProfile,
      profilePicture: req.file ? `/uploads/${req.file.filename}` : '',  // Store the image path
    });

    // Save to database
    await newAlumni.save();
    
    res.status(201).json(newAlumni);
  } catch (error) {
    console.error('Error adding alumni:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = { getAllAlumni, searchAlumni,addAlumni };
