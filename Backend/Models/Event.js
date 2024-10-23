const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String, // Event description
  date: { type: Date, required: true }, // Date of the event
  location: String, // Location of the event

  link: { type: String }, // Registration link for the event
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
