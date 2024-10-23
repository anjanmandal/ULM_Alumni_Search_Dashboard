
const Alumni = require('../Models/Alumni')
const Event =require('../Models/job')
exports.addEvent = async (req, res) => {
    const { title, description, date, location, alumniId, link } = req.body;
  
    try {
      const alumni = await Alumni.findById(alumniId);
      if (!alumni) {
        console.log('here')
        return res.status(404).json({ error: 'Alumni not found' });
      }
  
      const newEvent = new Event({
        title,
        description,
        date,
        location,
        link, // Include link in event creation
      });
  
      await newEvent.save();
      alumni.events.push(newEvent._id);
      await alumni.save();
  
      res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
 

  exports.getEvents = async (req, res) => {
    try {
      const events = await Event.find();  // No more population of participants
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
