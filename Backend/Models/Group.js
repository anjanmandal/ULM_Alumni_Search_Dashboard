const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: { type: String, required: true }, // Group name
  description: String, // Optional description
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }], // Alumni members
}, { timestamps: true });

// Model Name: Group
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
