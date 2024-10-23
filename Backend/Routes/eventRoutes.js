const express = require('express');
const { addEvent, getEvents } = require('../Controllers/eventController');
const { protect, roleCheck } = require('../Middleware/authMiddleware');
const router = express.Router();


// Route to add an event
router.post('/add-event',protect,roleCheck('alumni'), addEvent);

// Route to get all events
router.get('/', getEvents);

module.exports = router;
