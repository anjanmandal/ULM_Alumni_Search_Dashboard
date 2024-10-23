const mongoose = require('mongoose');

const mentorshipSchema = mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }, // Alumni who is the mentor
  mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }], // Alumni or users who are mentees
  active: { type: Boolean, default: true },
}, { timestamps: true });

// Model Name: Mentorship
const Mentorship = mongoose.model('Mentorship', mentorshipSchema);

module.exports = Mentorship;
