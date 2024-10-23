const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, roleCheck } = require('../Middleware/authMiddleware');
const { getProfile,getAlumniProfile,updateUser } = require('../Controllers/userController');
const User = require('../Models/User');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  }
});
const upload = multer({ storage: storage });

// Route only accessible by admin
router.get('/profile', protect, getProfile); // Protected route
router.get('/alumni-profile',protect,getAlumniProfile)
router.get('/admin', protect, roleCheck('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

// Route only accessible by alumni
router.get('/alumni', protect, roleCheck('alumni'), (req, res) => {
  res.json({ message: 'Welcome, Alumni!' });
});

// Public route
router.get('/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});

router.put('/profile', upload.single('profilePicture'),protect,updateUser);

module.exports = router;
