const express = require('express');
const { addJobPosting, getJobPostings } = require('../Controllers/jobController');
const { protect, roleCheck } = require('../Middleware/authMiddleware');
const router = express.Router();

// Route to add a job posting
router.post('/add-job',protect,roleCheck('alumni'), addJobPosting);

// Route to get all job postings
router.get('/', getJobPostings);

module.exports = router;
