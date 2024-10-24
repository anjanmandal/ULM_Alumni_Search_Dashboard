const Alumni = require('../Models/Alumni');
const User= require('../Models/User')
const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password'); // Fetch user without password

    // Convert ObjectId to a string before sending to the client
    const userObject = user.toObject();
   
    console.log("data--------------------------------------------------------------------",userObject);

    // Check if the user is an alumni
    if (user.role === 'alumni') {
      const alumni = await Alumni.findOne({ user: userId }); // Fetch alumni details for the user
      res.json({ ...userObject, alumni });
    } else {
      res.json(userObject);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile data', error });
  }
};

  const getAlumniProfile = async (req, res) => {
    try {
      // Find the alumni profile and populate the 'user' field
      const alumniProfile = await Alumni.findOne({ user: req.user._id }).populate('user', 'name email profilePicture role'); // Populate the user fields you want
  
      if (!alumniProfile) {
        return res.status(404).json({ message: 'Alumni profile not found' });
      }
  
      res.json(alumniProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const updateUser = async (req, res) => {
    const userId = req.user._id;
    const { name, graduationYear, occupation, degree } = req.body; // Don't expect profilePicture in req.body, it will be in req.file
  
    try {
      // Update the user
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update basic user fields
      user.name = name || user.name;
      if (req.file) {
        user.profilePicture = `/uploads/${req.file.filename}`;  // Update profilePicture in user object
      }
  
      // If the user is an alumni, update alumni-specific fields
      if (user.role === 'alumni') {
        const alumni = await Alumni.findOne({ user: userId });
  
        if (alumni) {
          alumni.graduationYear = graduationYear || alumni.graduationYear;
          alumni.occupation = occupation || alumni.occupation;
          alumni.degree = degree || alumni.degree;
          await alumni.save();
        }
      }
  
      await user.save();
  
      res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
    }
};

  
  
  module.exports = { getProfile,getAlumniProfile,updateUser };