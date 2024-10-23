const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware');
const { registerUser, loginUser,checkAuth,logoutUser } = require('../Controllers/authController');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser); // Route to log out a user
router.get('/check-auth', protect, (req, res) => {
    res.json({ isAuthenticated: true });
  });
  

module.exports = router;
