const mongoose = require('mongoose');

const achievementSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String, // Description of the achievement
  alumni: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }, // Reference to the alumni
  date: { type: Date, default: Date.now },
}, { timestamps: true });

// Model Name: Achievement
const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
