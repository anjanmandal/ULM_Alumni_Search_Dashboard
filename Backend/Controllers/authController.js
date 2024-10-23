const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Alumni=require('../Models/Alumni')

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Adjust the expiration time as needed
  });
};

exports.registerUser = async (req, res) => {
  const { name, email, password, role, graduationYear, degree, occupation, location, linkedinProfile } = req.body;

  try {
    // Validate input fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({ name, email, password, role });

    // If the user role is alumni, create the associated Alumni profile
    let alumni = null;
    if (role === 'alumni') {
      alumni = await Alumni.create({
        name,
        graduationYear,
        degree,
        occupation,
        location,
        linkedinProfile,
        user: user._id, // Link to the user account
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Set the JWT in a secure HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
      sameSite: 'strict', // Prevent CSRF attacks
    });

    // Respond with user and alumni (if created)
    res.status(201).json({
      message: 'User registered successfully',
      user,
      alumni,
    });
  } catch (error) {
    console.error('Error occurred during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      // Set the JWT in a secure HTTP-only cookie
      res.cookie('jwt', token, {
        httpOnly: true, // Prevents JavaScript access
        secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
        sameSite: 'strict', // Prevent CSRF attacks
      });

      res.status(200).json({ message: 'Logged in successfully', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  // Clear the cookie
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), // Set the cookie expiration date to the past to delete it
  });

  res.status(200).json({ message: 'Logged out successfully' });
};


