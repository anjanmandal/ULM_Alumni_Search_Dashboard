const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// Protect routes and verify JWT from cookies
const protect = async (req, res, next) => {
  const token = req.cookies.jwt; // Get token from the cookies
  console.log('here');

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID stored in the token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    // Attach the user to the request object for further use
    req.user = user;
    
    next(); // Continue to the next middleware or the controller
  } catch (error) {
    console.error('JWT error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
// Check for roles (admin, user, alumni)
const roleCheck = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      return next();
    }
    return res.status(403).json({ message: 'Access denied: insufficient privileges' });
  };
};

module.exports = { roleCheck,protect };
